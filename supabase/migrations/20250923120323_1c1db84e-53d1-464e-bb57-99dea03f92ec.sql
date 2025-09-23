-- Create partner accounts table
CREATE TABLE public.partner_accounts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  industry TEXT,
  contact_email TEXT,
  contact_phone TEXT,
  billing_settings JSONB DEFAULT '{}',
  notification_settings JSONB DEFAULT '{}',
  integration_settings JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create partner members table
CREATE TABLE public.partner_members (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  partner_id UUID NOT NULL REFERENCES public.partner_accounts(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  name TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('admin', 'manager', 'viewer')),
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'pending')),
  invited_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  joined_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(partner_id, email)
);

-- Create workspaces table (client companies)
CREATE TABLE public.workspaces (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  partner_id UUID NOT NULL REFERENCES public.partner_accounts(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  company_name TEXT NOT NULL,
  sector TEXT,
  location TEXT,
  dpo_name TEXT,
  dpo_email TEXT,
  dpo_phone TEXT,
  supervisory_authority TEXT,
  registration_number TEXT,
  website TEXT,
  module_config JSONB DEFAULT '{"ropa": true, "dpia": true, "dsr": true, "breach": true, "vendor": true, "lia": true}',
  settings JSONB DEFAULT '{}',
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'archived')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create workspace members table
CREATE TABLE public.workspace_members (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  workspace_id UUID NOT NULL REFERENCES public.workspaces(id) ON DELETE CASCADE,
  partner_member_id UUID NOT NULL REFERENCES public.partner_members(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('workspace_admin', 'manager', 'contributor', 'viewer')),
  permissions JSONB DEFAULT '{}',
  joined_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(workspace_id, partner_member_id)
);

-- Create tasks table
CREATE TABLE public.tasks (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  workspace_id UUID NOT NULL REFERENCES public.workspaces(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  module_type TEXT CHECK (module_type IN ('ropa', 'dpia', 'dsr', 'breach', 'vendor', 'lia')),
  module_reference_id UUID,
  assignee_type TEXT NOT NULL CHECK (assignee_type IN ('workspace', 'individual')),
  assigned_to UUID REFERENCES public.workspace_members(id),
  due_date DATE,
  priority TEXT NOT NULL DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed', 'cancelled')),
  attachments JSONB DEFAULT '[]',
  created_by UUID NOT NULL REFERENCES public.partner_members(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  completed_at TIMESTAMP WITH TIME ZONE
);

-- Create workspace metadata table
CREATE TABLE public.workspace_metadata (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  workspace_id UUID NOT NULL REFERENCES public.workspaces(id) ON DELETE CASCADE,
  category TEXT NOT NULL,
  key TEXT NOT NULL,
  value TEXT NOT NULL,
  description TEXT,
  is_custom BOOLEAN DEFAULT true,
  version INTEGER DEFAULT 1,
  created_by UUID REFERENCES public.partner_members(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(workspace_id, category, key)
);

-- Create workspace data dictionary table
CREATE TABLE public.workspace_data_dictionary (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  workspace_id UUID NOT NULL REFERENCES public.workspaces(id) ON DELETE CASCADE,
  term TEXT NOT NULL,
  definition TEXT NOT NULL,
  category TEXT,
  is_custom BOOLEAN DEFAULT true,
  version INTEGER DEFAULT 1,
  created_by UUID REFERENCES public.partner_members(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(workspace_id, term)
);

-- Enable Row Level Security
ALTER TABLE public.partner_accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.partner_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workspaces ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workspace_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workspace_metadata ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workspace_data_dictionary ENABLE ROW LEVEL SECURITY;

-- Create policies (basic ones for now, will be enhanced when auth is added)
CREATE POLICY "Enable read access for all users" ON public.partner_accounts FOR SELECT USING (true);
CREATE POLICY "Enable insert access for all users" ON public.partner_accounts FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable update access for all users" ON public.partner_accounts FOR UPDATE USING (true);

CREATE POLICY "Enable read access for all users" ON public.partner_members FOR SELECT USING (true);
CREATE POLICY "Enable insert access for all users" ON public.partner_members FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable update access for all users" ON public.partner_members FOR UPDATE USING (true);

CREATE POLICY "Enable read access for all users" ON public.workspaces FOR SELECT USING (true);
CREATE POLICY "Enable insert access for all users" ON public.workspaces FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable update access for all users" ON public.workspaces FOR UPDATE USING (true);

CREATE POLICY "Enable read access for all users" ON public.workspace_members FOR SELECT USING (true);
CREATE POLICY "Enable insert access for all users" ON public.workspace_members FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable update access for all users" ON public.workspace_members FOR UPDATE USING (true);

CREATE POLICY "Enable read access for all users" ON public.tasks FOR SELECT USING (true);
CREATE POLICY "Enable insert access for all users" ON public.tasks FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable update access for all users" ON public.tasks FOR UPDATE USING (true);

CREATE POLICY "Enable read access for all users" ON public.workspace_metadata FOR SELECT USING (true);
CREATE POLICY "Enable insert access for all users" ON public.workspace_metadata FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable update access for all users" ON public.workspace_metadata FOR UPDATE USING (true);

CREATE POLICY "Enable read access for all users" ON public.workspace_data_dictionary FOR SELECT USING (true);
CREATE POLICY "Enable insert access for all users" ON public.workspace_data_dictionary FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable update access for all users" ON public.workspace_data_dictionary FOR UPDATE USING (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_partner_accounts_updated_at
  BEFORE UPDATE ON public.partner_accounts
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_workspaces_updated_at
  BEFORE UPDATE ON public.workspaces
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_tasks_updated_at
  BEFORE UPDATE ON public.tasks
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_workspace_metadata_updated_at
  BEFORE UPDATE ON public.workspace_metadata
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_workspace_data_dictionary_updated_at
  BEFORE UPDATE ON public.workspace_data_dictionary
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default metadata categories for new workspaces
CREATE OR REPLACE FUNCTION public.create_default_workspace_metadata()
RETURNS TRIGGER AS $$
BEGIN
  -- Insert default metadata categories
  INSERT INTO public.workspace_metadata (workspace_id, category, key, value, description, is_custom) VALUES
  (NEW.id, 'data_types', 'personal_data', 'Information relating to an identified or identifiable natural person', 'Core GDPR data type', false),
  (NEW.id, 'data_types', 'special_category', 'Personal data revealing racial origin, political opinions, religious beliefs, etc.', 'Article 9 GDPR special categories', false),
  (NEW.id, 'legal_basis', 'consent', 'The data subject has given consent to the processing', 'Article 6(1)(a) GDPR', false),
  (NEW.id, 'legal_basis', 'contract', 'Processing is necessary for the performance of a contract', 'Article 6(1)(b) GDPR', false),
  (NEW.id, 'legal_basis', 'legal_obligation', 'Processing is necessary for compliance with a legal obligation', 'Article 6(1)(c) GDPR', false),
  (NEW.id, 'legal_basis', 'legitimate_interests', 'Processing is necessary for legitimate interests', 'Article 6(1)(f) GDPR', false);

  -- Insert default data dictionary terms
  INSERT INTO public.workspace_data_dictionary (workspace_id, term, definition, category, is_custom) VALUES
  (NEW.id, 'Personal Data', 'Any information relating to an identified or identifiable natural person', 'Core Terms', false),
  (NEW.id, 'Data Controller', 'The entity that determines the purposes and means of processing personal data', 'Core Terms', false),
  (NEW.id, 'Data Processor', 'The entity that processes personal data on behalf of the controller', 'Core Terms', false),
  (NEW.id, 'Data Subject', 'An identified or identifiable natural person', 'Core Terms', false),
  (NEW.id, 'Processing', 'Any operation performed on personal data', 'Core Terms', false);

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger to populate default metadata when workspace is created
CREATE TRIGGER create_default_workspace_metadata_trigger
  AFTER INSERT ON public.workspaces
  FOR EACH ROW
  EXECUTE FUNCTION public.create_default_workspace_metadata();
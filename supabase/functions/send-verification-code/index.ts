import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface VerificationRequest {
  email: string;
  code: string;
  firstName: string;
  lastName: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email, code, firstName, lastName }: VerificationRequest = await req.json();

    console.log(`Sending verification code to ${email}`);

    // Use Resend API directly
    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${Deno.env.get("RESEND_API_KEY")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "GDPR Compliance <onboarding@resend.dev>",
        to: [email],
        subject: "Verify your email address",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h1 style="color: #333; text-align: center;">Welcome ${firstName}!</h1>
            <p style="color: #666; font-size: 16px;">Thank you for signing up. Please use the verification code below to complete your account setup:</p>
            
            <div style="background-color: #f8f9fa; border: 2px solid #e9ecef; border-radius: 8px; padding: 30px; text-align: center; margin: 30px 0;">
              <h2 style="color: #333; font-size: 32px; letter-spacing: 8px; margin: 0; font-weight: bold;">${code}</h2>
            </div>
            
            <p style="color: #666; font-size: 14px;">This code will expire in 10 minutes for security reasons.</p>
            <p style="color: #666; font-size: 14px;">If you didn't request this verification, please ignore this email.</p>
            
            <hr style="border: none; border-top: 1px solid #e9ecef; margin: 30px 0;">
            <p style="color: #999; font-size: 12px; text-align: center;">GDPR Compliance Platform</p>
          </div>
        `,
      }),
    });

    if (!resendResponse.ok) {
      const errorData = await resendResponse.json();
      throw new Error(`Resend API error: ${errorData.message || resendResponse.statusText}`);
    }

    const emailResponse = await resendResponse.json();
    console.log("Verification email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ success: true, id: emailResponse.id }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error sending verification email:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Failed to send verification email" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
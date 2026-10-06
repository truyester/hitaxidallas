import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req: Request) {
  try {
    const apiKey = process.env.RESEND_API_KEY;
    const recipientEmail = process.env.CONDUCTORES_EMAIL_RECEPTOR;

    if (!apiKey) {
      return NextResponse.json(
        { error: "Falta la variable de entorno RESEND_API_KEY" },
        { status: 500 }
      );
    }

    if (!recipientEmail) {
      return NextResponse.json(
        { error: "Falta la variable de entorno CONDUCTORES_EMAIL_RECEPTOR" },
        { status: 500 }
      );
    }

    const body = await req.json();

    const {
      nombre,
      apellido,
      telefono,
      email,
      ciudad,
      tipoVehiculo,
      anoVehiculo,
      experiencia,
      comentarios,
    } = body;

    if (!nombre || !telefono || !email) {
      return NextResponse.json(
        { error: "Faltan campos obligatorios (Nombre, Teléfono o Email)" },
        { status: 400 }
      );
    }

    const resend = new Resend(apiKey);

    const data = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || "HI TAXI Drivers <onboarding@resend.dev>",
      to: [recipientEmail],
      replyTo: email,
      subject: `🚖 Nueva Solicitud de Conductor: ${nombre} ${apellido || ""}`,
      html: `
        <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
          <div style="background-color: #FABD0D; padding: 20px; text-align: center;">
            <h1 style="margin: 0; color: #000; font-size: 24px;">HI TAXI - Solicitud de Conductor</h1>
          </div>
          <div style="padding: 24px;">
            <p style="font-size: 16px; font-weight: bold;">Se ha recibido un nuevo registro de conductor desde la página web:</p>

            <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px solid #eee; font-weight: bold;">Nombre Completo:</td>
                <td style="padding: 8px 0; border-bottom: 1px solid #eee;">${nombre} ${apellido || ""}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px solid #eee; font-weight: bold;">Teléfono:</td>
                <td style="padding: 8px 0; border-bottom: 1px solid #eee;">
                  <a href="tel:${telefono}" style="color: #FABD0D; font-weight: bold;">${telefono}</a>
                </td>
              </tr>
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px solid #eee; font-weight: bold;">Correo Electrónico:</td>
                <td style="padding: 8px 0; border-bottom: 1px solid #eee;">${email}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px solid #eee; font-weight: bold;">Ciudad / Zona:</td>
                <td style="padding: 8px 0; border-bottom: 1px solid #eee;">${ciudad || "No especificada"}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px solid #eee; font-weight: bold;">Tipo de Vehículo:</td>
                <td style="padding: 8px 0; border-bottom: 1px solid #eee;">${tipoVehiculo || "No especificado"}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px solid #eee; font-weight: bold;">Año del Vehículo:</td>
                <td style="padding: 8px 0; border-bottom: 1px solid #eee;">${anoVehiculo || "N/A"}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px solid #eee; font-weight: bold;">Experiencia previa:</td>
                <td style="padding: 8px 0; border-bottom: 1px solid #eee;">${experiencia || "No especificada"}</td>
              </tr>
              ${
                comentarios
                  ? `
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px solid #eee; font-weight: bold;">Notas adicionales:</td>
                <td style="padding: 8px 0; border-bottom: 1px solid #eee;">${comentarios}</td>
              </tr>
              `
                  : ""
              }
            </table>
          </div>
          <div style="background-color: #181b20; color: #888; padding: 12px; text-align: center; font-size: 12px;">
            Este mensaje fue enviado automáticamente desde el formulario web de HI TAXI Dallas.
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Error al enviar con Resend:", error);
    return NextResponse.json(
      { error: "Error interno al enviar la solicitud" },
      { status: 500 }
    );
  }
}
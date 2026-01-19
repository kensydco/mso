import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    // Validate required fields
    if (!data.brand || !data.name || !data.email || !data.subject || !data.message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // If GHL webhook URL is configured, send the data
    if (process.env.GHL_WEBHOOK_URL) {
      const response = await fetch(process.env.GHL_WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          source: 'kensyd-website',
          timestamp: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        console.error('GHL webhook error:', await response.text());
        return NextResponse.json(
          { error: 'Failed to submit form' },
          { status: 500 }
        );
      }
    } else {
      // Log the submission if no webhook is configured (development mode)
      console.log('Contact form submission (no webhook configured):', data);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

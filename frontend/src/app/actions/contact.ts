'use server'

import clientPromise from '@/lib/mongodb';
import { headers } from 'next/headers';

export async function submitContact(formData: FormData) {
  try {
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const subject = formData.get('subject') as string;
    const message = formData.get('message') as string;

    if (!name || !email || !subject || !message) {
      return { success: false, error: 'All fields are required.' };
    }

    // Get IP address for rate limiting
    let ip = 'unknown';
    try {
      const headersList = await headers();
      ip = headersList.get('x-forwarded-for') || 'unknown';
      // In local development, x-forwarded-for might be null
      if (ip === 'unknown') {
         ip = '127.0.0.1'; // Default fallback for local testing
      }
    } catch (e) {
      // Fallback if headers fail to resolve
    }

    const client = await clientPromise;
    const db = client.db('govtJobScraperDB');
    const collection = db.collection('contactMessages');

    // Rate Limiting Check (max 5 per 24 hours per IP)
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    if (ip !== 'unknown') {
      const recentMessages = await collection.countDocuments({
        ip,
        createdAt: { $gte: oneDayAgo }
      });

      if (recentMessages >= 5) {
        return { success: false, error: 'Rate limit exceeded! You can only send up to 5 messages per day to prevent spam.' };
      }
    }

    // Insert into MongoDB
    await collection.insertOne({
      name,
      email,
      subject,
      message,
      ip,
      createdAt: new Date(),
    });

    return { success: true };
  } catch (error) {
    console.error('Contact form error:', error);
    return { success: false, error: 'Internal server error. Failed to send message.' };
  }
}

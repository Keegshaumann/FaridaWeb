/**
 * Google Analytics 4 Data API Integration
 * 
 * This module fetches real analytics data from GA4 using the Data API.
 * Falls back to mock data if credentials are not configured.
 */

interface GA4Credentials {
  propertyId: string;
  serviceAccountKey: string;
}

interface AnalyticsData {
  overview: {
    totalUsers: number;
    totalPageViews: number;
    averageSessionDuration: number;
    bounceRate: number;
    newUsers: number;
    returningUsers: number;
  };
  dailyVisits: Array<{
    date: string;
    users: number;
    pageViews: number;
  }>;
  topPages: Array<{
    page: string;
    views: number;
    avgTime: number;
  }>;
  deviceBreakdown: Array<{
    device: string;
    users: number;
    percentage: number;
  }>;
  trafficSources: Array<{
    source: string;
    users: number;
    percentage: number;
  }>;
  topCountries: Array<{
    country: string;
    users: number;
  }>;
}

/**
 * Get access token from Google service account
 */
async function getAccessToken(serviceAccountKey: any): Promise<string> {
  const jwtHeader = btoa(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  
  const now = Math.floor(Date.now() / 1000);
  const jwtClaimSet = {
    iss: serviceAccountKey.client_email,
    scope: "https://www.googleapis.com/auth/analytics.readonly",
    aud: "https://oauth2.googleapis.com/token",
    exp: now + 3600,
    iat: now,
  };
  
  const jwtClaimSetEncoded = btoa(JSON.stringify(jwtClaimSet));
  const signatureInput = `${jwtHeader}.${jwtClaimSetEncoded}`;
  
  // Import the private key
  const privateKey = await crypto.subtle.importKey(
    "pkcs8",
    pemToArrayBuffer(serviceAccountKey.private_key),
    {
      name: "RSASSA-PKCS1-v1_5",
      hash: "SHA-256",
    },
    false,
    ["sign"]
  );
  
  // Sign the JWT
  const signature = await crypto.subtle.sign(
    "RSASSA-PKCS1-v1_5",
    privateKey,
    new TextEncoder().encode(signatureInput)
  );
  
  const signatureEncoded = btoa(String.fromCharCode(...new Uint8Array(signature)));
  const jwt = `${signatureInput}.${signatureEncoded}`;
  
  // Exchange JWT for access token
  const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: jwt,
    }),
  });
  
  const tokenData = await tokenResponse.json();
  return tokenData.access_token;
}

/**
 * Convert PEM private key to ArrayBuffer
 */
function pemToArrayBuffer(pem: string): ArrayBuffer {
  const b64 = pem
    .replace(/-----BEGIN PRIVATE KEY-----/, "")
    .replace(/-----END PRIVATE KEY-----/, "")
    .replace(/\s/g, "");
  const binaryString = atob(b64);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes.buffer;
}

/**
 * Fetch real analytics data from GA4
 */
export async function fetchGA4Analytics(range: string): Promise<AnalyticsData> {
  const propertyId = Deno.env.get("GA4_PROPERTY_ID");
  const serviceAccountKeyJson = Deno.env.get("GA4_SERVICE_ACCOUNT_KEY");
  
  // If credentials not configured, return mock data
  if (!propertyId || !serviceAccountKeyJson) {
    console.log("GA4 credentials not configured, using mock data");
    return getMockAnalyticsData(range);
  }
  
  try {
    const serviceAccountKey = JSON.parse(serviceAccountKeyJson);
    const accessToken = await getAccessToken(serviceAccountKey);
    
    const days = range === "7days" ? 7 : range === "30days" ? 30 : 90;
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);
    const startDateStr = startDate.toISOString().split('T')[0];
    const endDateStr = new Date().toISOString().split('T')[0];
    
    // Fetch overview metrics
    const overviewResponse = await fetch(
      `https://analyticsdata.googleapis.com/v1beta/properties/${propertyId}:runReport`,
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          dateRanges: [{ startDate: startDateStr, endDate: endDateStr }],
          metrics: [
            { name: "totalUsers" },
            { name: "screenPageViews" },
            { name: "averageSessionDuration" },
            { name: "bounceRate" },
            { name: "newUsers" },
          ],
        }),
      }
    );
    
    const overviewData = await overviewResponse.json();
    
    // Fetch daily traffic
    const dailyResponse = await fetch(
      `https://analyticsdata.googleapis.com/v1beta/properties/${propertyId}:runReport`,
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          dateRanges: [{ startDate: startDateStr, endDate: endDateStr }],
          dimensions: [{ name: "date" }],
          metrics: [
            { name: "totalUsers" },
            { name: "screenPageViews" },
          ],
          orderBys: [{ dimension: { dimensionName: "date" } }],
        }),
      }
    );
    
    const dailyData = await dailyResponse.json();
    
    // Fetch top pages
    const pagesResponse = await fetch(
      `https://analyticsdata.googleapis.com/v1beta/properties/${propertyId}:runReport`,
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          dateRanges: [{ startDate: startDateStr, endDate: endDateStr }],
          dimensions: [{ name: "pagePath" }],
          metrics: [
            { name: "screenPageViews" },
            { name: "averageSessionDuration" },
          ],
          orderBys: [{ metric: { metricName: "screenPageViews" }, desc: true }],
          limit: 5,
        }),
      }
    );
    
    const pagesData = await pagesResponse.json();
    
    // Fetch device breakdown
    const deviceResponse = await fetch(
      `https://analyticsdata.googleapis.com/v1beta/properties/${propertyId}:runReport`,
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          dateRanges: [{ startDate: startDateStr, endDate: endDateStr }],
          dimensions: [{ name: "deviceCategory" }],
          metrics: [{ name: "totalUsers" }],
        }),
      }
    );
    
    const deviceData = await deviceResponse.json();
    
    // Fetch traffic sources
    const sourceResponse = await fetch(
      `https://analyticsdata.googleapis.com/v1beta/properties/${propertyId}:runReport`,
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          dateRanges: [{ startDate: startDateStr, endDate: endDateStr }],
          dimensions: [{ name: "sessionDefaultChannelGroup" }],
          metrics: [{ name: "totalUsers" }],
          orderBys: [{ metric: { metricName: "totalUsers" }, desc: true }],
        }),
      }
    );
    
    const sourceData = await sourceResponse.json();
    
    // Fetch country data
    const countryResponse = await fetch(
      `https://analyticsdata.googleapis.com/v1beta/properties/${propertyId}:runReport`,
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          dateRanges: [{ startDate: startDateStr, endDate: endDateStr }],
          dimensions: [{ name: "country" }],
          metrics: [{ name: "totalUsers" }],
          orderBys: [{ metric: { metricName: "totalUsers" }, desc: true }],
          limit: 4,
        }),
      }
    );
    
    const countryData = await countryResponse.json();
    
    // Transform GA4 data to our format
    return transformGA4Data(
      overviewData,
      dailyData,
      pagesData,
      deviceData,
      sourceData,
      countryData
    );
  } catch (error) {
    console.error("Error fetching GA4 data:", error);
    return getMockAnalyticsData(range);
  }
}

/**
 * Transform GA4 API response to our analytics format
 */
function transformGA4Data(
  overview: any,
  daily: any,
  pages: any,
  devices: any,
  sources: any,
  countries: any
): AnalyticsData {
  // Parse overview metrics
  const overviewMetrics = overview.rows?.[0]?.metricValues || [];
  const totalUsers = parseInt(overviewMetrics[0]?.value || "0");
  const totalPageViews = parseInt(overviewMetrics[1]?.value || "0");
  const avgSessionDuration = parseFloat(overviewMetrics[2]?.value || "0");
  const bounceRate = parseFloat(overviewMetrics[3]?.value || "0") * 100;
  const newUsers = parseInt(overviewMetrics[4]?.value || "0");
  const returningUsers = totalUsers - newUsers;
  
  // Parse daily visits
  const dailyVisits = (daily.rows || []).map((row: any) => {
    const dateStr = row.dimensionValues[0].value;
    const year = dateStr.substring(0, 4);
    const month = dateStr.substring(4, 6);
    const day = dateStr.substring(6, 8);
    return {
      date: `${year}-${month}-${day}`,
      users: parseInt(row.metricValues[0].value),
      pageViews: parseInt(row.metricValues[1].value),
    };
  });
  
  // Parse top pages
  const topPages = (pages.rows || []).slice(0, 5).map((row: any) => ({
    page: row.dimensionValues[0].value,
    views: parseInt(row.metricValues[0].value),
    avgTime: Math.round(parseFloat(row.metricValues[1].value)),
  }));
  
  // Parse device breakdown
  const deviceTotalUsers = (devices.rows || []).reduce(
    (sum: number, row: any) => sum + parseInt(row.metricValues[0].value),
    0
  );
  const deviceBreakdown = (devices.rows || []).map((row: any) => {
    const users = parseInt(row.metricValues[0].value);
    let device = row.dimensionValues[0].value;
    // Capitalize first letter
    device = device.charAt(0).toUpperCase() + device.slice(1);
    return {
      device,
      users,
      percentage: parseFloat(((users / deviceTotalUsers) * 100).toFixed(1)),
    };
  });
  
  // Parse traffic sources
  const sourceTotalUsers = (sources.rows || []).reduce(
    (sum: number, row: any) => sum + parseInt(row.metricValues[0].value),
    0
  );
  const trafficSources = (sources.rows || []).map((row: any) => {
    const users = parseInt(row.metricValues[0].value);
    return {
      source: row.dimensionValues[0].value,
      users,
      percentage: parseFloat(((users / sourceTotalUsers) * 100).toFixed(1)),
    };
  });
  
  // Parse top countries
  const topCountries = (countries.rows || []).map((row: any) => ({
    country: row.dimensionValues[0].value,
    users: parseInt(row.metricValues[0].value),
  }));
  
  return {
    overview: {
      totalUsers,
      totalPageViews,
      averageSessionDuration: Math.round(avgSessionDuration),
      bounceRate: parseFloat(bounceRate.toFixed(1)),
      newUsers,
      returningUsers,
    },
    dailyVisits,
    topPages,
    deviceBreakdown,
    trafficSources,
    topCountries,
  };
}

/**
 * Generate mock analytics data for demonstration
 */
export function getMockAnalyticsData(range: string): AnalyticsData {
  const days = range === "7days" ? 7 : range === "30days" ? 30 : 90;
  const dailyVisits = [];
  
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    dailyVisits.push({
      date: date.toISOString().split('T')[0],
      users: Math.floor(Math.random() * 100) + 20,
      pageViews: Math.floor(Math.random() * 200) + 50,
    });
  }

  return {
    overview: {
      totalUsers: 1847,
      totalPageViews: 4521,
      averageSessionDuration: 185,
      bounceRate: 42.5,
      newUsers: 1203,
      returningUsers: 644,
    },
    dailyVisits,
    topPages: [
      { page: '/services/prosthetics', views: 892, avgTime: 245 },
      { page: '/', views: 1547, avgTime: 165 },
      { page: '/services/custom-orthotics', views: 673, avgTime: 198 },
      { page: '/about', views: 521, avgTime: 142 },
      { page: '/contact', views: 487, avgTime: 112 },
    ],
    deviceBreakdown: [
      { device: 'Mobile', users: 1102, percentage: 59.7 },
      { device: 'Desktop', users: 628, percentage: 34.0 },
      { device: 'Tablet', users: 117, percentage: 6.3 },
    ],
    trafficSources: [
      { source: 'Google Search', users: 892, percentage: 48.3 },
      { source: 'Direct', users: 445, percentage: 24.1 },
      { source: 'Social Media', users: 312, percentage: 16.9 },
      { source: 'Referral', users: 198, percentage: 10.7 },
    ],
    topCountries: [
      { country: 'South Africa', users: 1456 },
      { country: 'United Kingdom', users: 178 },
      { country: 'United States', users: 124 },
      { country: 'Australia', users: 89 },
    ],
  };
}

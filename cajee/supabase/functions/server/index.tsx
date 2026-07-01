import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";
import { fetchGA4Analytics } from "./analytics.tsx";
const app = new Hono();

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/server/health", (c) => {
  return c.json({ status: "ok" });
});

// Get all case studies
app.get("/server/case-studies", async (c) => {
  try {
    const caseStudies = await kv.getByPrefix("case_study:");
    // Sort by createdAt descending
    const sorted = caseStudies.sort((a: any, b: any) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    return c.json(sorted);
  } catch (error) {
    console.log("Error fetching case studies:", error);
    return c.json({ error: "Failed to fetch case studies" }, 500);
  }
});

// Create a new case study
app.post("/server/case-studies", async (c) => {
  try {
    const body = await c.req.json();
    const id = crypto.randomUUID();
    const caseStudy = {
      id,
      ...body,
      createdAt: new Date().toISOString(),
    };
    
    await kv.set(`case_study:${id}`, caseStudy);
    return c.json(caseStudy, 201);
  } catch (error) {
    console.log("Error creating case study:", error);
    return c.json({ error: "Failed to create case study" }, 500);
  }
});

// Update a case study
app.put("/server/case-studies/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const body = await c.req.json();
    
    const existing = await kv.get(`case_study:${id}`);
    if (!existing) {
      return c.json({ error: "Case study not found" }, 404);
    }
    
    const updated = {
      ...existing,
      ...body,
      id, // Preserve the original ID
      createdAt: existing.createdAt, // Preserve original creation date
    };
    
    await kv.set(`case_study:${id}`, updated);
    return c.json(updated);
  } catch (error) {
    console.log("Error updating case study:", error);
    return c.json({ error: "Failed to update case study" }, 500);
  }
});

// Delete a case study
app.delete("/server/case-studies/:id", async (c) => {
  try {
    const id = c.req.param("id");
    await kv.del(`case_study:${id}`);
    return c.json({ success: true });
  } catch (error) {
    console.log("Error deleting case study:", error);
    return c.json({ error: "Failed to delete case study" }, 500);
  }
});

// Get all signup submissions
app.get("/server/signups", async (c) => {
  try {
    const signups = await kv.getByPrefix("signup:");
    // Sort by createdAt descending
    const sorted = signups.sort((a: any, b: any) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    return c.json(sorted);
  } catch (error) {
    console.log("Error fetching signups:", error);
    return c.json({ error: "Failed to fetch signups" }, 500);
  }
});

// Create a new signup submission
app.post("/server/signups", async (c) => {
  try {
    const body = await c.req.json();
    const id = crypto.randomUUID();
    const signup = {
      id,
      ...body,
      createdAt: new Date().toISOString(),
    };
    
    await kv.set(`signup:${id}`, signup);
    return c.json(signup, 201);
  } catch (error) {
    console.log("Error creating signup:", error);
    return c.json({ error: "Failed to create signup" }, 500);
  }
});

// Delete a signup submission
app.delete("/server/signups/:id", async (c) => {
  try {
    const id = c.req.param("id");
    await kv.del(`signup:${id}`);
    return c.json({ success: true });
  } catch (error) {
    console.log("Error deleting signup:", error);
    return c.json({ error: "Failed to delete signup" }, 500);
  }
});

// Get all patients
app.get("/server/patients", async (c) => {
  try {
    const patients = await kv.getByPrefix("patient:");
    // Sort by createdAt descending
    const sorted = patients.sort((a: any, b: any) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    return c.json(sorted);
  } catch (error) {
    console.log("Error fetching patients:", error);
    return c.json({ error: "Failed to fetch patients" }, 500);
  }
});

// Create a new patient record
app.post("/server/patients", async (c) => {
  try {
    const body = await c.req.json();
    const id = crypto.randomUUID();
    const patient = {
      id,
      ...body,
      createdAt: new Date().toISOString(),
    };
    
    await kv.set(`patient:${id}`, patient);
    return c.json(patient, 201);
  } catch (error) {
    console.log("Error creating patient record:", error);
    return c.json({ error: "Failed to create patient record" }, 500);
  }
});

// Update a patient record
app.put("/server/patients/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const body = await c.req.json();
    
    const existing = await kv.get(`patient:${id}`);
    if (!existing) {
      return c.json({ error: "Patient not found" }, 404);
    }
    
    const updated = {
      ...existing,
      ...body,
      id, // Preserve the original ID
      createdAt: existing.createdAt, // Preserve original creation date
      updatedAt: new Date().toISOString(),
    };
    
    await kv.set(`patient:${id}`, updated);
    return c.json(updated);
  } catch (error) {
    console.log("Error updating patient record:", error);
    return c.json({ error: "Failed to update patient record" }, 500);
  }
});

// Delete a patient record
app.delete("/server/patients/:id", async (c) => {
  try {
    const id = c.req.param("id");
    await kv.del(`patient:${id}`);
    return c.json({ success: true });
  } catch (error) {
    console.log("Error deleting patient record:", error);
    return c.json({ error: "Failed to delete patient record" }, 500);
  }
});

// Get analytics data
app.get("/server/analytics", async (c) => {
  try {
    const range = c.req.query("range") || "30days";
    
    // Fetch analytics data from Google Analytics 4 (or mock data if not configured)
    const analyticsData = await fetchGA4Analytics(range);
    
    return c.json(analyticsData);
  } catch (error) {
    console.log("Error fetching analytics:", error);
    return c.json({ error: "Failed to fetch analytics" }, 500);
  }
});

Deno.serve(app.fetch);
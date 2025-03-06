import { Inngest } from "inngest";
import { serve } from "inngest/hono";

// Create a client to send and receive events
export const inngest = new Inngest({ id: "my-app", eventKey: "lol" });

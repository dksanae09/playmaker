import { v } from "convex/values";
import { mutation } from "./_generated/server";

export const create = mutation({
  args: {
    name: v.string(),
    description: v.optional(v.string()),
    owner: v.id("users"),
    editors: v.array(v.id("users")),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Called createPlayground without authentication present");
    }
    return await ctx.db.insert("playgrounds", {
      name: args.name,
      description: args.description,
      owner: args.owner,
      editors: args.editors,
    });
  },
});

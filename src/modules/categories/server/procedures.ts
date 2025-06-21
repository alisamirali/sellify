/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseProcedure, createTRPCRouter } from "@/trpc/init";

export const categoriesRouter = createTRPCRouter({
  getMany: baseProcedure.query(async ({ ctx }) => {
    const data = await ctx.db.find({
      collection: "categories",
      depth: 1,
      pagination: false,
      where: {
        parent: {
          exists: false,
        },
      },
      sort: "name",
    } as any);

    const formattedData = data.docs.map((doc) => ({
      ...doc,
      subcategories:
        doc && "subcategories" in doc && doc.subcategories?.docs
          ? doc.subcategories.docs.map((subDoc: any) => ({
              ...subDoc,
            }))
          : [],
    }));

    return formattedData;
  }),
});

/* eslint-disable @typescript-eslint/no-explicit-any */
import { isSuperAdmin } from "@/lib/access";
import type { CollectionConfig } from "payload";

const Products: CollectionConfig = {
  slug: "products",
  access: {
    create: ({ req }) => {
      if (isSuperAdmin(req?.user)) return true;

      const tenant = req?.user?.tenants?.[0] as any;

      return tenant?.stripeDetailsSubmitted;
    },
    delete: ({ req }) => isSuperAdmin(req?.user),
  },
  admin: {
    useAsTitle: "name",
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
    },
    {
      name: "description",
      type: "richText",
    },
    {
      name: "price",
      type: "number",
      required: true,
      admin: {
        description: "Price in USD. Use decimal format (e.g., 19.99).",
      },
    },
    {
      name: "category",
      type: "relationship",
      relationTo: "categories",
      hasMany: false,
    },
    {
      name: "image",
      type: "upload",
      relationTo: "media",
    },
    {
      name: "refundPolicy",
      type: "select",
      options: ["30-days", "14-days", "7-days", "3-days", "1-day", "no-refund"],
      defaultValue: "30-days",
    },
    {
      name: "tags",
      type: "relationship",
      relationTo: "tags",
      hasMany: true,
    },
    {
      name: "content",
      type: "richText",
      admin: {
        description:
          "Additional content or details about the product. (Supports Markdown)",
      },
    },
    {
      name: "isArchived",
      label: "Archived",
      defaultValue: false,
      type: "checkbox",
      admin: {
        description:
          "Mark this product as archived. It will not be visible to customers.",
      },
    },
    {
      name: "isPrivate",
      label: "Private",
      defaultValue: false,
      type: "checkbox",
      admin: {
        description:
          "Mark this product as private. It will not be visible to customers, but can be accessed via direct link.",
      },
    },
  ],
};

export default Products;

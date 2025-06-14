import { isSuperAdmin } from "@/lib/access";
import type { CollectionConfig } from "payload";

const Tenants: CollectionConfig = {
  slug: "tenants",
  access: {
    create: ({ req }) => isSuperAdmin(req?.user),
    delete: ({ req }) => isSuperAdmin(req?.user),
  },
  admin: {
    useAsTitle: "slug",
  },
  fields: [
    {
      name: "name",
      required: true,
      type: "text",
      label: "Store Name",
      admin: {
        description: "The name of the store, displayed in the header.",
      },
    },
    {
      name: "slug",
      type: "text",
      index: true,
      unique: true,
      required: true,
      access: {
        update: ({ req }) => isSuperAdmin(req?.user),
      },
      admin: {
        description: "The subdomain for the store, used in the URL.",
      },
    },
    {
      name: "image",
      type: "upload",
      relationTo: "media",
    },
    {
      name: "stripeAccountId",
      type: "text",
      access: {
        update: ({ req }) => isSuperAdmin(req?.user),
      },
      admin: {
        description:
          "Stripe Account ID associated with your tenant. Required for Stripe integration.",
      },
    },
    {
      name: "stripeDetailsSubmitted",
      type: "checkbox",
      access: {
        update: ({ req }) => isSuperAdmin(req?.user),
      },
      admin: {
        description:
          "You can not create products until you submit your Stripe account details.",
      },
    },
  ],
};

export default Tenants;

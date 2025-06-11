import type { CollectionConfig } from "payload";

const Tenants: CollectionConfig = {
  slug: "tenants",
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
      admin: {
        readOnly: true,
      },
    },
    {
      name: "stripeDetailsSubmitted",
      type: "checkbox",
      admin: {
        description:
          "You can not create products until you submit your Stripe account details.",
      },
    },
  ],
};

export default Tenants;

import { isSuperAdmin } from "@/lib/access";
import { tenantsArrayField } from "@payloadcms/plugin-multi-tenant/fields";
import type { CollectionConfig } from "payload";

const defaultTenantsArrayField = tenantsArrayField({
  tenantsArrayFieldName: "tenants",
  tenantsCollectionSlug: "tenants",
  tenantsArrayTenantFieldName: "tenant",
  arrayFieldAccess: {
    read: () => true,
    create: ({ req }) => isSuperAdmin(req?.user),
    update: ({ req }) => isSuperAdmin(req?.user),
  },
  tenantFieldAccess: {
    read: () => true,
    create: ({ req }) => isSuperAdmin(req?.user),
    update: ({ req }) => isSuperAdmin(req?.user),
  },
});

const Users: CollectionConfig = {
  slug: "users",
  access: {
    read: () => true,
    create: ({ req }) => isSuperAdmin(req?.user),
    delete: ({ req }) => isSuperAdmin(req?.user),
    update: ({ req, id }) => {
      if (isSuperAdmin(req?.user)) return true;

      return req?.user?.id === id;
    },
  },
  admin: {
    useAsTitle: "email",
    hidden: ({ user }) => !isSuperAdmin(user),
  },
  auth: true,
  fields: [
    {
      name: "username",
      type: "text",
      required: true,
      unique: true,
    },
    {
      admin: {
        position: "sidebar",
      },
      name: "roles",
      type: "select",
      defaultValue: ["user"],
      hasMany: true,
      options: ["super-admin", "user"],
      access: {
        update: ({ req }) => isSuperAdmin(req?.user),
      },
    },
    {
      ...defaultTenantsArrayField,
      admin: {
        ...(defaultTenantsArrayField?.admin || {}),
        position: "sidebar",
      },
    },
  ],
};

export default Users;

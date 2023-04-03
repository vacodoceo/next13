import { NhostClient as LibNHostClient } from "@nhost/nhost-js";

export class NHostClient {
  private static instance: LibNHostClient;

  private constructor() {}

  public static async getInstance(): Promise<LibNHostClient> {
    if (!NHostClient.instance) {
      const nHostClient = new LibNHostClient({
        adminSecret: process.env.NHOST_ADMIN_SECRET as string,
        subdomain: process.env.NHOST_SUBDOMAIN as string,
        region: process.env.NHOST_REGION as string,
      });

      NHostClient.instance = nHostClient;
    }

    return NHostClient.instance;
  }
}

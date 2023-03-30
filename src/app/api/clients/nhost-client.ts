import { NhostClient as LibNHostClient } from "@nhost/nhost-js";

export class NHostClient {
  private static instance: LibNHostClient;

  private constructor() {}

  public static async getInstance(): Promise<LibNHostClient> {
    if (!NHostClient.instance) {
      const nHostClient = new LibNHostClient({
        subdomain: process.env.NHOST_SUBDOMAIN as string,
        region: process.env.NHOST_REGION as string,
      });

      const signInResponse = await nHostClient.auth.signIn({
        email: process.env.NHOST_CLIENT_EMAIL as string,
        password: process.env.NHOST_CLIENT_PASSWORD as string,
      });

      if (signInResponse.error) {
        throw signInResponse.error;
      }

      NHostClient.instance = nHostClient;
    }

    return NHostClient.instance;
  }
}

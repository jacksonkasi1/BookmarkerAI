interface WebauthnCredential {
  aaguid: string;
  attestation_type: string;
  created_at: string;
  id: string;
  name: string;
  public_key: string;
  transports: string[];
}

// Define the type for your user data
export interface User {
  id: string;
  email: string;
  updated_at: string;
  created_at: string;
  webauthn_credentials: WebauthnCredential[];
}

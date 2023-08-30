import{ useEffect, useState } from 'react';
import jwt_decode, { JwtPayload } from 'jwt-decode';

interface DecodedToken extends JwtPayload {
  id: number;
  phoneNumber: string;
  name: string;
  refreshToken: string;
  role: string
}

export function useTokenDecoding(): [string, DecodedToken | null] {
  const [accessToken, setAccessToken] = useState<string>('');
  const [decodedToken, setDecodedToken] = useState<DecodedToken | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    setAccessToken(token || '');
  }, []);

  useEffect(() => {
    if (accessToken) {
      const decoded = decodeAccessToken(accessToken);
      setDecodedToken(decoded);
    }
  }, [accessToken]);

  return [accessToken, decodedToken];
}

function decodeAccessToken (token: string): DecodedToken | null  {
    try {
      const decodedToken = jwt_decode<DecodedToken>(token);
      return decodedToken;
    } catch (error) {
      console.error('Error decoding access token:', error);
      return null;
    }
  };


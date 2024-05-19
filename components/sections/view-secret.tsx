'use client';

import React from 'react';
import Container, { ContainerHeader } from '../ui/container';
import { Secret } from '@prisma/client';
import { expireSecret, fetchSecret } from '@/services/secret';
import { isExpired } from '@/lib/utils';
import ErrorLabel from '../ui/error-label';
import { decrypt } from '@/lib/encryption';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Skeleton } from '../ui/skeleton';
import Link from 'next/link';
import { route } from '@/constants/route.constant';

const ViewSecret: React.FC<{ id: string }> = ({ id }) => {
  const [secretObj, setSecretObj] = React.useState<Secret>();
  const [decrytedMessage, setDecryptedMessage] = React.useState('');
  const [expired, setExpired] = React.useState(false);
  const [initialLoading, setInitialLoading] = React.useState(true);
  const [password, setPassword] = React.useState('');
  const [passwordError, setPasswordError] = React.useState('');

  const isSecretExpired = (secret: Secret) => {
    const createdDate = new Date(secret.createdAt);
    if (isExpired(createdDate, secret.age) || secret.isRead) {
      return true;
    }
    return false;
  };

  const decryptAndExpireSecret = async (
    secretObj: Secret,
    password: string,
  ) => {
    const decrypted = await decrypt(secretObj.encryptedMessage, password);
    if (decrypted.success) {
      setDecryptedMessage(decrypted.message);
      expireSecret(secretObj.id);
    } else {
      if (secretObj.isProtected) {
        setPasswordError('Invalid password');
      }
    }
  };

  const handleViewSecret = async () => {
    if (!password.trim()) {
      setPasswordError('Password is a required field');
    } else {
      await decryptAndExpireSecret(secretObj!, password);
    }
  };

  React.useEffect(() => {
    if (secretObj && !secretObj.isProtected && !secretObj.isRead) {
      decryptAndExpireSecret(secretObj, '');
    }
  }, [secretObj]);

  React.useEffect(() => {
    fetchSecret(id)
      .then((res) => {
        if (res.success && res.data) {
          const data = res.data;
          if (isSecretExpired(data)) {
            setExpired(true);
          } else {
            setSecretObj(res.data);
          }
        } else {
          setExpired(true);
        }
      })
      .finally(() => {
        setInitialLoading(false);
      });
  }, [id]);

  const handleComponentRender = () => {
    if (initialLoading && !secretObj) {
      return (
        <div className="space-y-2">
          <Skeleton className="h-5" />
          <Skeleton className="h-5" />
          <Skeleton className="h-5" />
        </div>
      );
    } else if (secretObj && !expired) {
      if (!secretObj.isProtected && decrytedMessage) {
        return (
          <div className="rounded bg-yellow-500/20 p-4 text-left select-none">
            {decrytedMessage}
          </div>
        );
      } else if (secretObj.isProtected && !decrytedMessage) {
        return (
          <div>
            <div className="w-full sm:flex space-y-5 sm:space-y-0 gap-5">
              <Input
                type="text"
                placeholder="Enter Password"
                className="shadow-inner"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <Button className="w-full sm:w-40" onClick={handleViewSecret}>
                View Secret
              </Button>
            </div>
            {passwordError && <ErrorLabel>{passwordError}</ErrorLabel>}
          </div>
        );
      } else if (secretObj.isProtected && decrytedMessage) {
        return (
          <div className="rounded bg-yellow-500/20 p-4 text-left select-none">
            {decrytedMessage}
          </div>
        );
      }
    } else {
      return <ErrorLabel>The link is either expired or broken.</ErrorLabel>;
    }
  };

  return (
    <Container extraTopPadding className="sm:text-center">
      <ContainerHeader className="py-10">
        View{' '}
        <span className="text-primary underline decoration-destructive text-nowrap">
          SecretPass
        </span>
      </ContainerHeader>
      <div className="space-y-5">{handleComponentRender()}</div>
    </Container>
  );
};

export default ViewSecret;

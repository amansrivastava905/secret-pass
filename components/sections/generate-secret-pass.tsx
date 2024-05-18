'use client';

import React from 'react';
import Container, { ContainerHeader } from '../ui/container';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { LuCopy, LuCopyCheck } from 'react-icons/lu';
import { generateSecret } from '@/services/secret';
import ErrorLabel from '../ui/error-label';
import { toast } from 'sonner';

const initialFormData = {
  message: '',
  password: '',
  secretLink: '',
};

const GenerateSecretPass = () => {
  const [formData, setFormData] = React.useState(initialFormData);
  const [errors, setErrors] = React.useState(initialFormData);
  const [loading, setLoading] = React.useState(false);
  const [copied, setCopied] = React.useState(false);

  const copyToClipboard = (content: string) => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    toast('Copied to clipboard');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleInput = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const isValidated = () => {
    let newErrors: any = {};
    if (!formData.message.trim()) {
      newErrors.message = "Hey, you can't have an empty secret!";
    }
    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleGenerateSecret = async () => {
    if (isValidated()) {
      setLoading(true);
      const secretLink = await generateSecret(
        formData.message.trim(),
        formData.password.trim(),
      );

      if (secretLink.success) {
        setFormData({ ...initialFormData, secretLink: secretLink.data || '' });
      } else {
        toast('Something went wrong! Please try again later.');
      }
      setLoading(false);
    }
  };

  return (
    <Container
      extraTopPadding
      className="bg-secondary xl:rounded-b-3xl min-h-screen xl:min-h-[90vh] text-center ">
      <ContainerHeader className="max-w-3xl mx-auto py-10">
        Share Secrets Confidently with{' '}
        <span className="text-primary underline decoration-wavy decoration-destructive text-nowrap">
          SecretPass
        </span>
      </ContainerHeader>

      <div className="max-w-3xl mx-auto space-y-5">
        <div>
          {formData.secretLink && (
            <p
              className="text-left bg-green-800 py-2 px-3 rounded-md text-primary-foreground/80 hover:text-primary-foreground hover:bg-green-900 flex justify-between items-center cursor-pointer gap-x-5"
              onClick={() => {
                copyToClipboard(formData.secretLink);
              }}>
              <span className=" overflow-auto">{formData.secretLink}</span>
              <span className="bg-white/20 hover:bg-white/40 p-2 rounded-md text-primary-foreground">
                {copied ? <LuCopyCheck /> : <LuCopy />}
              </span>
            </p>
          )}
        </div>
        <div>
          <Textarea
            className="shadow-inner min-h-[250px]"
            placeholder="Enter your secret & generate a shareable link"
            name="message"
            value={formData.message}
            onChange={handleInput}
            disabled={loading}
          />
          {errors.message && formData.message.length === 0 && (
            <ErrorLabel>{errors.message}</ErrorLabel>
          )}
        </div>
        <div className="w-full sm:flex space-y-5 sm:space-y-0 gap-5">
          <Input
            className="shadow-inner"
            placeholder="Password protect your secret (optional)"
            type="text"
            name="password"
            value={formData.password}
            onChange={handleInput}
            disabled={loading}
          />
          <Button
            className="w-full sm:w-40"
            onClick={handleGenerateSecret}
            disabled={loading}>
            Generate
          </Button>
        </div>
      </div>
    </Container>
  );
};

export default GenerateSecretPass;

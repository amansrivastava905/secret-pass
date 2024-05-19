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
import { RadioGroup } from '../ui/radio-group';
import StyledRadio from '../ui/styled-radio';
import { Label } from '../ui/label';

const initialFormData = {
  message: '',
  password: '',
  secretLink: '',
  expiryDuration: '15',
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
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (isValidated()) {
      setLoading(true);
      const secretLink = await generateSecret(
        formData.message.trim(),
        formData.password.trim(),
        formData.expiryDuration,
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
    <Container extraTopPadding className="sm:text-center ">
      <ContainerHeader className="py-10">
        Share Secrets Confidently with{' '}
        <span className="text-primary underline decoration-destructive text-nowrap">
          SecretPass
        </span>
      </ContainerHeader>
      <div className="space-y-5">
        <div>
          {formData.secretLink && (
            <div>
              <Label className="block text-left py-2">
                Remember! Link will expire once opened.
              </Label>
              <div
                className="text-left bg-green-800 py-2 px-3 rounded-md text-primary-foreground/80 hover:text-primary-foreground hover:bg-green-900 flex justify-between items-center cursor-pointer gap-x-5"
                onClick={() => {
                  copyToClipboard(formData.secretLink);
                }}>
                <span className=" overflow-auto">{formData.secretLink}</span>
                <span className="bg-white/20 hover:bg-white/40 p-2 rounded-md text-primary-foreground">
                  {copied ? <LuCopyCheck /> : <LuCopy />}
                </span>
              </div>
            </div>
          )}
        </div>
        <div>
          <Label htmlFor="message" className="block text-left py-2">
            Enter your secret
          </Label>
          <Textarea
            className="shadow-inner min-h-[250px]"
            name="message"
            value={formData.message}
            onChange={handleInput}
            disabled={loading}
          />
          {errors.message && formData.message.length === 0 && (
            <ErrorLabel>{errors.message}</ErrorLabel>
          )}
        </div>
        <div>
          <Label htmlFor="message" className="block text-left py-2">
            Secret should expire in
          </Label>
          <RadioGroup
            name="expiryDuration"
            defaultValue="15"
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-x-2"
            onValueChange={(value) => {
              setFormData({ ...formData, expiryDuration: value });
            }}>
            <StyledRadio value="15" label="15 mins" />
            <StyledRadio value="60" label="1 hr" />
            <StyledRadio value="360" label="6 hrs" />
            <StyledRadio value="1440" label="1 day" />
            <StyledRadio value="4320" label="3 days" />
          </RadioGroup>
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

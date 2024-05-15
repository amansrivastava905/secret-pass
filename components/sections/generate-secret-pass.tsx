'use client';

import React from 'react';
import Container from '../ui/container';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { LuCopy, LuCopyCheck } from 'react-icons/lu';

const GenerateSecretPass = () => {
  const [copied, setCopied] = React.useState(false);
  const [secretLink, setSecretLink] = React.useState('');

  const copyToClipboard = (content: string) => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Container
      extraTopPadding
      className="bg-secondary xl:rounded-b-3xl min-h-screen xl:min-h-[90vh] text-center ">
      <h1 className="max-w-2xl mx-auto pb-10">
        Share Secret Texts Confidently with{' '}
        <span className="text-primary underline decoration-wavy decoration-destructive text-nowrap">
          Secret Pass
        </span>
      </h1>
      <div className="max-w-2xl mx-auto space-y-5">
        <Textarea
          className="shadow-inner min-h-[250px]"
          placeholder="Enter your secret & generate a shareable link"
        />
        <div className="w-full sm:flex space-y-5 sm:space-y-0 gap-5">
          <Input placeholder="Password protect your secret" />
          <Button className="w-full sm:w-40">Generate</Button>
        </div>
        <div>
          <p
            className="text-left bg-green-800 py-2 px-3 rounded-md text-primary-foreground/80 hover:text-primary-foreground hover:bg-green-900 flex justify-between items-center cursor-pointer gap-x-5"
            onClick={() => {
              copyToClipboard(secretLink);
            }}>
            <span className=" overflow-auto">{secretLink}</span>
            <span className="bg-white/20 hover:bg-white/40 p-2 rounded-md text-primary-foreground">
              {copied ? <LuCopyCheck /> : <LuCopy />}
            </span>
          </p>
        </div>
      </div>
    </Container>
  );
};

export default GenerateSecretPass;

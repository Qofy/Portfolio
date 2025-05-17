import { ReactNode } from "react";

interface InfoDetailsProps {
  header: string;
  nameHighlight: string;
  name: string;
  occupation?: string;
  profileText: string;
  children?: ReactNode;
}

export function InfoDetails({
  header,
  nameHighlight,
  name,
  occupation,
  profileText,
  children
}: InfoDetailsProps) {
  return (
    <div className="intro">
      <header className="intro__header">{header}</header>
      <p className="intro__name">
        <em className="name-style">{nameHighlight}</em> {name}
      </p>
      {occupation && <p className="intro__occupation">{occupation}</p>}
      <div className="intro__profile">{profileText}</div>
      {children}
    </div>
  );
}

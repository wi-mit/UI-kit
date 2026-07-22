import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import styles from "./docs.module.css";

type PackageManager = "npm" | "pnpm" | "yarn" | "bun";

const installCommands: Record<PackageManager, (name: string) => string> = {
  npm: (name) => `npx @mit-wi/ui@latest add ${name}`,
  pnpm: (name) => `pnpm dlx @mit-wi/ui@latest add ${name}`,
  yarn: (name) => `yarn dlx @mit-wi/ui@latest add ${name}`,
  bun: (name) => `bunx @mit-wi/ui@latest add ${name}`,
};

function CopyButton({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const id = window.setTimeout(() => setCopied(false), 1400);
    return () => window.clearTimeout(id);
  }, [copied]);

  return (
    <button
      type="button"
      className={styles.copyBtn}
      aria-label={copied ? "Copied" : "Copy"}
      title={copied ? "Copied" : "Copy"}
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(value);
          setCopied(true);
        } catch {
          setCopied(false);
        }
      }}
    >
      {copied ? (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M5 13l4 4L19 7"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ) : (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden>
          <rect
            x="8"
            y="8"
            width="12"
            height="12"
            rx="2"
            stroke="currentColor"
            strokeWidth="1.8"
          />
          <path
            d="M6 16V6a2 2 0 0 1 2-2h10"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      )}
    </button>
  );
}

function highlightCode(code: string) {
  const pattern =
    /(\/\/.*$|'(?:\\.|[^'\\])*'|"(?:\\.|[^"\\])*"|`(?:\\.|[^`\\])*`|\b(?:import|from|export|const|let|var|return|function|typeof|new|await)\b|<\/?[A-Za-z][\w.]*|\/?>|=|{|}|\(|\)|\.|:)/gm;

  const nodes: ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;

  while ((match = pattern.exec(code)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(code.slice(lastIndex, match.index));
    }

    const token = match[0];
    let className = styles.tokenPlain;

    if (token.startsWith("//")) className = styles.tokenComment;
    else if (
      token.startsWith("'") ||
      token.startsWith('"') ||
      token.startsWith("`")
    ) {
      className = styles.tokenString;
    } else if (
      /^(import|from|export|const|let|var|return|function|typeof|new|await)$/.test(
        token,
      )
    ) {
      className = styles.tokenKeyword;
    } else if (/^<\/?[A-Za-z]/.test(token)) {
      className = styles.tokenTag;
    } else if (token === "=" || token === "{" || token === "}") {
      className = styles.tokenPunct;
    }

    nodes.push(
      <span key={key++} className={className}>
        {token}
      </span>,
    );
    lastIndex = match.index + token.length;
  }

  if (lastIndex < code.length) {
    nodes.push(code.slice(lastIndex));
  }

  return nodes;
}

function CodeBlock({ code }: { code: string }) {
  return (
    <div className={styles.codeBlock}>
      <button
        type="button"
        className={styles.copyBtn}
        aria-label="Copy"
        title="Copy"
        onClick={async (event) => {
          const button = event.currentTarget;
          try {
            await navigator.clipboard.writeText(code);
            button.dataset.copied = "true";
            window.setTimeout(() => {
              delete button.dataset.copied;
            }, 1200);
          } catch {
            /* ignore */
          }
        }}
      >
        <svg
          className={styles.copyIcon}
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden
        >
          <rect
            x="8"
            y="8"
            width="12"
            height="12"
            rx="2"
            stroke="currentColor"
            strokeWidth="1.8"
          />
          <path
            d="M6 16V6a2 2 0 0 1 2-2h10"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
        <svg
          className={styles.checkIcon}
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden
        >
          <path
            d="M5 13l4 4L19 7"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <pre className={styles.pre}>
        <code className={styles.code}>{highlightCode(code)}</code>
      </pre>
    </div>
  );
}

export function DocsSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section
      className={styles.section}
      id={title.toLowerCase().replace(/\s+/g, "-")}
    >
      <h2 className={styles.sectionTitle}>{title}</h2>
      {children}
    </section>
  );
}

function TerminalIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4 7l6 5-6 5M11 17h9"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Installation({
  name,
  manualFiles,
}: {
  name: string;
  manualFiles?: string[];
}) {
  const [tab, setTab] = useState<"command" | "manual">("command");
  const [pm, setPm] = useState<PackageManager>("npm");
  const command = installCommands[pm](name);

  return (
    <DocsSection title="Installation">
      <div className={styles.tabs} role="tablist" aria-label="Installation method">
        <button
          type="button"
          role="tab"
          aria-selected={tab === "command"}
          className={tab === "command" ? styles.tabActive : styles.tab}
          onClick={() => setTab("command")}
        >
          Command
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={tab === "manual"}
          className={tab === "manual" ? styles.tabActive : styles.tab}
          onClick={() => setTab("manual")}
        >
          Manual
        </button>
      </div>

      {tab === "command" ? (
        <div className={styles.installPanel}>
          <div className={styles.installToolbar}>
            <span className={styles.terminalIcon}>
              <TerminalIcon />
            </span>
            <div className={styles.pmGroup} role="tablist" aria-label="Package manager">
              {(["pnpm", "npm", "yarn", "bun"] as PackageManager[]).map((item) => (
                <button
                  key={item}
                  type="button"
                  role="tab"
                  aria-selected={pm === item}
                  className={pm === item ? styles.pmActive : styles.pm}
                  onClick={() => setPm(item)}
                >
                  {item}
                </button>
              ))}
            </div>
            <CopyButton value={command} />
          </div>
          <div className={styles.installCommand}>
            <code>{command}</code>
          </div>
        </div>
      ) : (
        <div className={styles.manualPanel}>
          <p className={styles.manualIntro}>
            Copy the component files into your project, then import design tokens
            once in your app entry:
          </p>
          <CodeBlock code={`import "@/styles/tokens.css";`} />
          {manualFiles?.length ? (
            <div className={styles.fileCard}>
              <p className={styles.fileTitle}>Required files</p>
              <ul className={styles.fileList}>
                {manualFiles.map((file) => (
                  <li key={file}>
                    <code>{file}</code>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      )}
    </DocsSection>
  );
}

export function Usage({
  importCode,
  exampleCode,
}: {
  importCode: string;
  exampleCode: string;
}) {
  return (
    <DocsSection title="Usage">
      <div className={styles.usageStack}>
        <CodeBlock code={importCode} />
        <CodeBlock code={exampleCode} />
      </div>
    </DocsSection>
  );
}

export type ApiProp = {
  prop: string;
  type: string;
  defaultValue?: string;
  description?: string;
};

function formatDescription(text: string) {
  const parts = text.split(/(`[^`]+`)/g);
  return parts.map((part, index) => {
    if (part.startsWith("`") && part.endsWith("`")) {
      return <code key={index}>{part.slice(1, -1)}</code>;
    }
    return <span key={index}>{part}</span>;
  });
}

export function ApiReference({
  components,
}: {
  components: Array<{
    name: string;
    description: string;
    props: ApiProp[];
  }>;
}) {
  return (
    <DocsSection title="API Reference">
      {components.map((component) => (
        <div key={component.name} className={styles.apiBlock}>
          <h3 className={styles.apiTitle}>{component.name}</h3>
          <p className={styles.apiDescription}>
            {formatDescription(component.description)}
          </p>
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Prop</th>
                  <th>Type</th>
                  <th>Default</th>
                </tr>
              </thead>
              <tbody>
                {component.props.map((row) => (
                  <tr key={row.prop}>
                    <td>
                      <code className={styles.propName}>{row.prop}</code>
                    </td>
                    <td>
                      <code className={styles.typeValue}>{row.type}</code>
                    </td>
                    <td>
                      <code className={styles.defaultValue}>
                        {row.defaultValue ?? "-"}
                      </code>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </DocsSection>
  );
}

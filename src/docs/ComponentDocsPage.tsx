import {
  Controls,
  Primary,
  Stories,
} from "@storybook/blocks";
import { componentDocs } from "./componentDocs";
import { ApiReference, Installation, Usage } from "./DocsBlocks";
import styles from "./ComponentDocsPage.module.css";

type ComponentDocsPageProps = {
  componentName: keyof typeof componentDocs;
};

export function ComponentDocsPage({ componentName }: ComponentDocsPageProps) {
  const doc = componentDocs[componentName];

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <p className={styles.eyebrow}>Components</p>
        <h1 className={styles.title}>{doc.name}</h1>
        <p className={styles.description}>{doc.description}</p>
      </header>

      <div className={styles.previewShell}>
        <Primary />
      </div>

      <Installation name={doc.cliName} manualFiles={doc.manualFiles} />
      <Usage importCode={doc.importCode} exampleCode={doc.exampleCode} />
      <ApiReference components={doc.api} />

      <section className={styles.section} id="controls">
        <h2 className={styles.heading}>Controls</h2>
        <div className={styles.panel}>
          <Controls />
        </div>
      </section>

      <section className={styles.section} id="examples">
        <h2 className={styles.heading}>Examples</h2>
        <div className={styles.examples}>
          <Stories includePrimary={false} />
        </div>
      </section>
    </div>
  );
}

export function createDocsPage(componentName: keyof typeof componentDocs) {
  return function DocsPage() {
    return <ComponentDocsPage componentName={componentName} />;
  };
}

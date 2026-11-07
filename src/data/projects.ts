import type { CaseStudy } from "./types";
import { journalApiFacts as facts } from "./facts";

/**
 * The projects the site publishes.
 *
 * Every number here is measured and every link is verified by
 * `tests/external-links.test.js`. Do not add a project whose repository is
 * private, whose demo is down, or whose case study would need a claim that
 * cannot be sourced.
 */
export const projects: CaseStudy[] = [
  {
    slug: "journal-api",
    name: "Journal API",
    year: "2026",
    tags: ["FastAPI", "AWS", "Kubernetes", "Terraform", "OpenTelemetry"],
    tagline: {
      es: "Capstone de cloud engineering: una API en producción, y el procedimiento para desmontarla.",
      en: "Cloud engineering capstone: an API in production, and the procedure to take it down.",
    },
    summary: {
      es: "API de journaling sobre FastAPI y PostgreSQL, desplegada de punta a punta en AWS con Kubernetes, Terraform y un pipeline con GitHub OIDC. El repositorio es público y el proyecto fue desmontado por completo en noviembre de 2026, con el procedimiento documentado.",
      en: "A journaling API on FastAPI and PostgreSQL, deployed end to end on AWS with Kubernetes, Terraform and a GitHub OIDC pipeline. The repository is public, and the whole thing was torn down in November 2026 with the procedure written down.",
    },
    role: {
      es: "Autor del proyecto — cloud engineering, infraestructura y pipeline",
      en: "Sole author — cloud engineering, infrastructure and pipeline",
    },
    status: {
      es: `Desmontado el 06/11/2026. ${facts.resourcesDestroyed} recursos destruidos. No está corriendo en AWS.`,
      en: `Torn down on 06/11/2026. ${facts.resourcesDestroyed} resources destroyed. Not running on AWS.`,
    },
    tech: [
      {
        label: { es: "Servicio", en: "Service" },
        value: "Python · FastAPI · PostgreSQL 16",
      },
      {
        label: { es: "Infraestructura", en: "Infrastructure" },
        value: `${facts.terraformResources} recursos de Terraform · EC2 t3.small con k3s · EKS`,
      },
      {
        label: { es: "Entrega", en: "Delivery" },
        value: "GitHub Actions con OIDC · sin claves permanentes",
      },
      {
        label: { es: "Seguridad", en: "Security" },
        value: "Secrets Manager acotado a 2 ARNs · CodeQL · gitleaks",
      },
      {
        label: { es: "Observabilidad", en: "Observability" },
        value: `ADOT · OpenTelemetry · X-Ray · CloudWatch · ${facts.metricSeries} series de métricas`,
      },
      {
        label: { es: "Licencia", en: "Licence" },
        value: "MIT",
      },
    ],
    architecture: {
      es: `  push a main
      │
      ▼
  ┌──────────────────────────────────────────────────┐
  │ GitHub Actions                                    │
  │  test    ruff + pytest sobre Postgres de servicio │
  │          gitleaks sobre el historial completo     │
  │  build   imagen Docker etiquetada con el SHA      │
  │          push a ECR                               │
  │  deploy  SSM Run Command → rollout →             │
  │          verificación contra /version            │
  └───────────────┬──────────────────────────────────┘
                  │ OIDC: sin claves en el repositorio
                  ▼
  ┌──────────────────────────────────────────────────┐
  │ EC2 t3.small · k3s                               │
  │  namespace journal-api                           │
  │  ADOT + Fluent Bit · Postgres · Caddy con TLS    │
  │  Secrets Manager → init container → tmpfs        │
  └───────────────┬──────────────────────────────────┘
                  │ HTTPS
                  ▼
              /version → el SHA desplegado`,
      en: `  push to main
      │
      ▼
  ┌──────────────────────────────────────────────────┐
  │ GitHub Actions                                    │
  │  test    ruff + pytest against a service Postgres │
  │          gitleaks over the full history          │
  │  build   Docker image tagged with the SHA         │
  │          push to ECR                             │
  │  deploy  SSM Run Command → rollout →             │
  │          verification against /version           │
  └───────────────┬──────────────────────────────────┘
                  │ OIDC: no keys in the repository
                  ▼
  ┌──────────────────────────────────────────────────┐
  │ EC2 t3.small · k3s                               │
  │  journal-api namespace                           │
  │  ADOT + Fluent Bit · Postgres · Caddy with TLS   │
  │  Secrets Manager → init container → tmpfs        │
  └───────────────┬──────────────────────────────────┘
                  │ HTTPS
                  ▼
              /version → the deployed SHA`,
    },
    sections: [
      {
        heading: { es: "Problema", en: "Problem" },
        body: {
          es: [
            "El capstone pedía una API desplegada en AWS con CI/CD, infraestructura como código y observabilidad. El problema real no era escribir la API: era que la entrega fuera reproducible y que nadie tuviera que buscar una credencial para hacer un deploy.",
            "Y había una segunda mitad del trabajo que casi nadie documenta: una vez que el proyecto termina, la infraestructura tiene que volver a su estado inicial. Eso no lo hace un `terraform destroy` y ya.",
          ],
          en: [
            "The capstone asked for an API deployed on AWS with CI/CD, infrastructure as code and observability. The real problem was not writing the API: it was making the delivery reproducible, and making sure nobody had to go looking for a credential in order to deploy.",
            "There was a second half to the job that almost nobody documents: once a project ends, the infrastructure has to go back to where it started. A `terraform destroy` on its own does not do that.",
          ],
        },
      },
      {
        heading: { es: "Enfoque", en: "Approach" },
        body: {
          es: [
            "Todo lo que puede estar en Terraform, está en Terraform. La VPC, los roles IAM, el Security Group, el topic de alarmas, el dashboard, las 13 reglas gestionadas de AWS Config, el presupuesto: 79 recursos, versionados, con los secretos detrás de un placeholder que Terraform nunca completa.",
            "Las credenciales no viajan por el estado. Terraform crea el \"cascarón\" del secreto —nombre, ARN, cifrado, política— pero nunca el valor. El valor se siembra fuera de banda, desde SSM Parameter Store a Secrets Manager, y lo baja un init container con una identidad propia. La identidad de la instancia tiene un Deny explícito sobre esos dos ARNs: no puede leerlos, sólo delegar.",
            "Y el pipeline no tiene llaves permanentes. GitHub Actions se autentica en AWS por OIDC, con un rol cuyo permiso es mínimo y cuyo alcance es el repositorio, la rama `main` y el environment `production`.",
          ],
          en: [
            "Everything that can live in Terraform does. The VPC, the IAM roles, the security group, the alarm topic, the dashboard, the 13 managed AWS Config rules, the budget: 79 resources, versioned, with every secret behind a placeholder Terraform never fills in.",
            "Credentials never travel through state. Terraform creates the secret's shell — name, ARN, encryption, policy — but never its value. The value is seeded out of band, from SSM Parameter Store into Secrets Manager, and an init container with its own identity pulls it down. The instance identity carries an explicit Deny on those two ARNs: it cannot read them, only delegate.",
            "And the pipeline holds no long-lived keys. GitHub Actions authenticates to AWS through OIDC, with a role whose permissions are minimal and whose trust is scoped to this repository, the `main` branch and the `production` environment.",
          ],
        },
      },
      {
        heading: { es: "Resultado", en: "Result" },
        body: {
          es: [
            `${facts.commitsAuthored} commits. ${facts.terraformResources} recursos de Terraform. El deploy se verifica contra /version, que devuelve el SHA del commit: cuatro valores independientes —el commit local, el tag de la imagen en ECR, el tag que corre Kubernetes y el SHA que responde la API— tienen que coincidir exactamente, y el job falla si no.`,
            "La observabilidad no es un panel: ADOT sobre OTLP hacia X-Ray y CloudWatch, Fluent Bit para los logs de los pods, spans propios (`db.entries.*`, `llm.analyze_entry`), 15 series de métricas con p50 y p95, un dashboard, y alarmas de 5xx y de latencia hacia SNS. En AWS Config, 13 reglas gestionadas —8 de conformidad y 5 de amenaza— que evalúan la postura de la cuenta; la primera evaluación dio 3 hallazgos reales, que se cerraron.",
            "Y el teardown se hizo completo el 06/11/2026, después de que pasara la verificación de la plataforma y de que el responsable del proyecto lo confirmara explícitamente: 99 recursos destruidos por Terraform, 66 imágenes de ECR borradas, 6107 versiones de S3 eliminadas a mano y los recursos que vivían fuera del estado —presupuestos y parámetros de SSM— limpiados también. El procedimiento completo, con lo que se encontró y lo que no, quedó en `docs/cleanup.md`.",
          ],
          en: [
            `${facts.commitsAuthored} commits. ${facts.terraformResources} Terraform resources. The deploy verifies against /version, which returns the commit SHA: four independent values — the local commit, the image tag in ECR, the tag Kubernetes is running and the SHA the API answers with — have to match exactly, and the job fails when they don't.`,
            "The observability is not a dashboard: ADOT over OTLP into X-Ray and CloudWatch, Fluent Bit for pod logs, custom spans (`db.entries.*`, `llm.analyze_entry`), 15 metric series with p50 and p95, a dashboard, and alarms on 5xx rate and latency routed to SNS. In AWS Config, 13 managed rules — 8 conformity and 5 threat — evaluate the posture of the account; the first evaluation produced 3 real findings, and all three were closed.",
            "And the teardown was carried out in full on 06/11/2026, after the platform verification passed and the project owner confirmed it explicitly: 99 resources destroyed by Terraform, 66 ECR images deleted, 6107 S3 versions emptied by hand, and the resources living outside state — budgets and SSM parameters — cleaned up too. The full procedure, with what was found and what was not, is in `docs/cleanup.md`.",
          ],
        },
      },
      {
        heading: { es: "Límites conocidos", en: "Known limits" },
        body: {
          es: [
            "La base de datos corre en una subnet pública. La razón fue el costo: una subnet privada con NAT Gateway cuesta más que la instancia completa en una cuenta sin tráfico real. Es una decisión de costo, no de diseño, y con tráfico real habría que revisarla.",
            "El destroy no es atómico, porque el repositorio de ECR no tiene `force_delete`: las imágenes se borran primero y el repositorio después, en dos pasadas. Y los presupuestos de AWS y algunos parámetros de SSM vivían fuera de Terraform, así que el destroy no los tocó y se limpiaron a mano.",
            "En k3s cualquier pod alcanza IMDS y puede obtener las credenciales del instance profile, así que el `ExternalId` protege del uso accidental, no de un atacante. El aislamiento real por pod necesita que AWS valide el token criptográficamente —IRSA o EKS Pod Identity— y eso exige un issuer OIDC público, inviable con una IP de `sslip.io` que Terraform reasigna en cada `destroy`.",
          ],
          en: [
            "The database runs in a public subnet. The reason was cost: a private subnet with a NAT Gateway costs more than the whole instance on an account with no real traffic. It is a cost decision, not a design one, and with real traffic it would need revisiting.",
            "The destroy is not atomic, because the ECR repository has no `force_delete`: the images go first and the repository second, in two passes. And the AWS budgets and some SSM parameters lived outside Terraform, so the destroy did not touch them and they were cleaned up by hand.",
            "On k3s any pod can reach IMDS and obtain the instance profile credentials, so the `ExternalId` protects against accidental use, not against an attacker. Real per-pod isolation needs AWS to validate the token cryptographically — IRSA or EKS Pod Identity — and that requires a public OIDC issuer, which is not viable with an `sslip.io` IP that Terraform reassigns on every `destroy`.",
          ],
        },
      },
    ],
    links: [
      {
        href: "https://github.com/amarillaRodrigo/journal-starter",
        label: { es: "Ver el repositorio", en: "View the repository" },
        kind: "repo",
        primary: true,
      },
      {
        href: "https://github.com/amarillaRodrigo/journal-starter-pipeline",
        label: { es: "Ver el pipeline", en: "View the pipeline" },
        kind: "pipeline",
      },
    ],
  },
  {
    slug: "postulado",
    name: "PostulaDo",
    year: "2026",
    tags: ["NestJS", "Next.js", "SGLang", "BullMQ", "PostgreSQL"],
    tagline: {
      es: "Del lote de ofertas al plan de estudio: qué oficios pide el mercado y por cuál entrar.",
      en: "From a batch of postings to a study plan: which roles the market asks for and how to enter them.",
    },
    summary: {
      es: "El problema no es aprender una herramienta: es aprender la correcta. PostulaDo toma un lote de ofertas, las agrupa por el tipo de trabajo que comparten, extrae los oficios que las cubren con su cobertura real sobre ese lote, y devuelve las alternativas de cada uno para no atar a nadie a un vendor. Backend NestJS con Prisma sobre PostgreSQL, colas BullMQ sobre Redis y extracción estructurada con SGLang; frontend Next.js estático que habla directo con la API.",
      en: "The problem is not learning a tool: it is learning the right one. PostulaDo takes a batch of postings, groups them by the kind of work they share, extracts the disciplines they cover with their real coverage over that batch, and returns alternatives for each so nobody is locked into one vendor. NestJS backend with Prisma over PostgreSQL, BullMQ queues on Redis and structured extraction with SGLang; a static Next.js frontend talks to the API directly.",
    },
    role: {
      es: "Autor del proyecto — backend y frontend",
      en: "Sole author — backend and frontend",
    },
    status: {
      es: "Implementación de referencia pública. Código abierto.",
      en: "Public reference implementation. Open source.",
    },
    tech: [
      { label: { es: "Framework", en: "Framework" }, value: "NestJS · Next.js · TypeScript" },
      { label: { es: "Datos", en: "Data" }, value: "Prisma · PostgreSQL · Redis" },
      {
        label: { es: "Análisis",
          en: "Analysis" },
        value: "SGLang (XGrammar, RadixAttention) · Cheerio",
      },
      {
        label: { es: "Dominio",
          en: "Domain" },
        value: "Taxonomía de 8 oficios con alternativas por tema",
      },
      { label: { es: "Colas", en: "Queues" }, value: "BullMQ · Redis" },
      {
        label: { es: "Seguridad",
          en: "Security" },
        value: "JWT · Passport · guards por rol · ownership checks",
      },
      {
        label: { es: "Testing",
          en: "Testing" },
        value: "e2e contra PostgreSQL y Redis reales en Docker Compose",
      },
    ],
    architecture: {
      es: `  Lote de URLs
      │
      ▼
  ┌─────────────────────────────────────────────┐
  │ API NestJS                                 │
  │  ─ AuthModule (JWT + Passport + Roles)      │
  │  ─ UsersModule (ownership por recurso)     │
  │  ─ PostulacionesModule (CRUD + lote)        │
  │  ─ AnálisisModule                           │
  │     ├─ BullMQ producer (URL → job)          │
  │     └─ BullMQ worker                        │
  │         ├─ Scraping con Cheerio             │
  │         └─ Extracción estructurada SGLang   │
  │  ─ Taxonomía (8 oficios + alternativas)      │
  └─────────────────────────────────────────────┘
      │                    │
      ▼                    ▼
  PostgreSQL           Redis + BullMQ
     (Prisma)              │
                          ▼
                    Inferencia SGLang

  ┌─────────────────────────────────────────────┐
  │ Frontend Next.js (estático)                 │
  │  encolar → poll → guardar → analizar el lote │
  └─────────────────────────────────────────────┘`,
      en: `  Batch of URLs
      │
      ▼
  ┌─────────────────────────────────────────────┐
  │ NestJS API                                  │
  │  ─ AuthModule (JWT + Passport + Roles)      │
  │  ─ UsersModule (ownership por recurso)     │
  │  ─ PostulacionesModule (CRUD + lote)        │
  │  ─ AnálisisModule                           │
  │     ├─ BullMQ producer (URL → job)          │
  │     └─ BullMQ worker                        │
  │         ├─ Scraping con Cheerio             │
  │         └─ Extracción estructurada SGLang   │
  │  ─ Taxonomía (8 oficios + alternativas)      │
  └─────────────────────────────────────────────┘
      │                    │
      ▼                    ▼
  PostgreSQL           Redis + BullMQ
     (Prisma)              │
                          ▼
                    Inferencia SGLang

  ┌─────────────────────────────────────────────┐
  │ Frontend Next.js (estático)                 │
  │  encolar → poll → guardar → analizar el lote │
  └─────────────────────────────────────────────┘`,
    },
    sections: [
      {
        heading: { es: "Problema", en: "Problem" },
        body: {
          es: [
            "Estudiar sin saber qué se pide es caro. Un profesional junior abre diez ofertas, ve diez listas de herramientas distintas y no sabe si el 10% o el 70% de lo que estudia le va a servir. Lo que hay en el mercado no es difícil de encontrar: está desperdigado en cada posting, y separado no dice nada.",
            "El reto no era resumir una oferta: era comparar un lote entero y sacar de ahí el plan de estudio. Y hacerlo sin mentir —cada porcentaje tiene que poder auditarse contra las ofertas que lo produjeron.",
          ],
          en: [
            "Studying without knowing what is being asked for is expensive. A junior opens ten postings, sees ten different tool lists and cannot tell whether 10% or 70% of what they study will matter. The market information is not hard to find: it is scattered across every posting, and scattered it says nothing.",
            "The challenge was not to summarise one posting: it was to compare a whole batch and derive the study plan from it. And to do it without lying —every percentage has to be auditable against the postings that produced it.",
          ],
        },
      },
      {
        heading: { es: "Enfoque", en: "Approach" },
        body: {
          es: [
            "Una API NestJS con arquitectura en capas. La capa de auth resuelve JWT con Passport, guards por rol y un ownership check en cada recurso por usuario: los roles y la propiedad son ejes separados, y un admin no es el dueño de un recurso.",
            "La clave está en una taxonomía: 36 tecnologías mapeadas a 8 oficios —pruebas, integración y entrega, nube, contenedores, datos, caché, backend, frontend— y cada oficio con las alternativas que lo cubren. El plan no dice \"aprendé AWS\": dice \"despliegue en la nube\" y ofrece AWS, Azure, GCP y Cloudflare. El denominador es siempre el lote, no el historial entero del usuario: un porcentaje sin el conjunto al que corresponde no significa nada.",
            "Y todo lo que no necesita estar en el camino del request —scraping, extracción, inferencia— va a una cola de BullMQ con Redis. El frontend es una app Next.js estática que encola, espera y consulta el análisis del lote; no hay proxy: habla directo con la API.",
          ],
          en: [
            "A NestJS API with layered architecture. The auth layer handles JWT through Passport, role guards and an ownership check on every per-user resource: roles and ownership are separate axes, and an admin is not the owner of a record.",
            "The key is a taxonomy: 36 technologies mapped to 8 disciplines —testing, delivery, cloud, containers, data, caching, backend, frontend— and each discipline with the alternatives that cover it. The plan does not say \"learn AWS\": it says \"cloud deployment\" and offers AWS, Azure, GCP and Cloudflare. The denominator is always the batch, not the user's whole history: a percentage without the set it belongs to means nothing.",
            "And everything that does not need to be in the request path —scraping, extraction, inference— goes to a BullMQ queue on Redis. The frontend is a static Next.js app that enqueues, waits and queries the batch analysis; there is no proxy: it talks to the API directly.",
          ],
        },
      },
      {
        heading: { es: "Resultado", en: "Result" },
        body: {
          es: [
            "El usuario pega cinco ofertas y recibe un plan: el tipo de trabajo que comparten, los oficios que las cubren con su cobertura sobre ese lote, y por cuál entrar. No treinta y seis herramientas: los pocos temas que de verdad importan, con alternativas para no quedar atado a un vendor.",
            "El análisis corre en background: el frontend encola, sigue trabajando y consulta el estado hasta que el lote está listo. Y la landing es estática —se publica dentro de este mismo portfolio— así que no necesita servidor propio para existir.",
          ],
          en: [
            "The user pastes five postings and gets a plan: the kind of work they share, the disciplines that cover them with their coverage over that batch, and how to enter each. Not thirty-six tools: the few themes that actually matter, with alternatives so nobody is locked to a vendor.",
            "The analysis runs in the background: the frontend enqueues, keeps working and polls the status until the batch is ready. And the landing is static —it ships inside this same portfolio— so it does not need its own server to exist.",
          ],
        },
      },
      {
        heading: { es: "Límites conocidos", en: "Known limits" },
        body: {
          es: [
            "La taxonomía es una tabla fija: 36 tecnologías mapeadas a 8 oficios. No descubre oficios nuevos, y una tecnología que no esté en la tabla no entra en ninguna cobertura. Es deliberado —un plan auditable vale más que uno que se inventa— pero es un límite real.",
            "El tipo de trabajo se detecta por la firma de temas, no por un modelo: es heurístico y puede equivocar el nombre del oficio aunque los porcentajes sean correctos.",
            "El scraping sigue siendo texto plano de una URL pública. Sin navegador headless, las ofertas que sólo existen detrás de JavaScript en el cliente no se leen.",
          ],
          en: [
            "The taxonomy is a fixed table: 36 technologies mapped to 8 disciplines. It does not discover new disciplines, and a technology that is not in the table enters no coverage. That is deliberate —an auditable plan is worth more than an invented one— but it is a real limit.",
            "The kind of work is detected by the signature of themes, not by a model: it is heuristic and can misname the discipline even when the percentages are right.",
            "Scraping is still plain text from a public URL. With no headless browser, listings that only exist behind client-side JavaScript are not read.",
          ],
        },
      },
    ],
    links: [
      {
        href: "https://github.com/amarillaRodrigo/PostulaDo",
        label: { es: "Ver el repositorio", en: "View the repository" },
        kind: "repo",
        primary: true,
      },
      {
        href: "https://rodrigoamarilla.tech/postulado/",
        label: { es: "Ver la landing", en: "View the landing" },
        kind: "demo",
      },
    ],
  },
  {
    slug: "task-tracker",
    name: "Task Tracker",
    year: "2026",
    tags: ["Next.js", "Fastify", "Prisma", "PostgreSQL", "pnpm"],
    tagline: {
      es: "Monorepo pnpm con API, web y CLI compartiendo tipos entre aplicaciones.",
      en: "A pnpm monorepo with API, web and CLI sharing types across apps.",
    },
    summary: {
      es: "Gestor de tareas diario con cuenta regresiva en vivo al fin del día. Monorepo pnpm con API Fastify, frontend Next.js y una CLI, con los tipos compartidos entre las tres aplicaciones y despliegues separados para web y API.",
      en: "A daily task tracker with a live countdown to the end of the day. A pnpm monorepo with a Fastify API, a Next.js frontend and a CLI, with types shared across all three and separate deployments for web and API.",
    },
    role: {
      es: "Autor del proyecto — full stack",
      en: "Sole author — full stack",
    },
    status: {
      es: "En vivo. API en Render, web en Vercel, base en Neon.",
      en: "Live. API on Render, web on Vercel, database on Neon.",
    },
    tech: [
      { label: { es: "API", en: "API" }, value: "Fastify · TypeBox · Prisma" },
      { label: { es: "Web", en: "Web" }, value: "Next.js App Router · Tailwind CSS" },
      { label: { es: "Datos", en: "Data" }, value: "PostgreSQL (Neon)" },
      { label: { es: "Monorepo", en: "Monorepo" }, value: "pnpm workspaces · tipos compartidos" },
      { label: { es: "Despliegue", en: "Deployment" }, value: "Vercel (web) · Render (API)" },
    ],
    sections: [
      {
        heading: { es: "Problema", en: "Problem" },
        body: {
          es: [
            "Hacer la cuenta regresiva del día tiene un problema de fondo: la hora de cierre depende de la zona horaria del usuario, y casi ninguna app la resuelve bien. El dato tiene que viajar por la API sin perder precisión.",
          ],
          en: [
            "A countdown to the end of the day has a deeper problem than it looks: the closing time depends on the user's timezone, and very few apps get that right. The value has to travel through the API without losing precision.",
          ],
        },
      },
      {
        heading: { es: "Enfoque", en: "Approach" },
        body: {
          es: [
            "Un monorepo pnpm con cuatro paquetes: `apps/api`, `apps/web`, `apps/cli` y `packages/core`, donde `core` contiene los tipos TypeScript compartidos. La API usa Fastify con TypeBox para la validación de esquemas, y Prisma sobre PostgreSQL.",
            "La CLI guarda en JSON en vez de pegarle a la API, así que la app sigue siendo usable sin servidor. Es la razón de que el paquete de tipos exista: la CLI y la web hablan el mismo idioma que la API.",
          ],
          en: [
            "A pnpm monorepo with four packages: `apps/api`, `apps/web`, `apps/cli` and `packages/core`, where `core` holds the shared TypeScript types. The API uses Fastify with TypeBox for schema validation, and Prisma over PostgreSQL.",
            "The CLI stores in JSON instead of calling the API, so the app stays usable without a server. That is why the types package exists: the CLI and the web speak the same language as the API.",
          ],
        },
      },
      {
        heading: { es: "Resultado", en: "Result" },
        body: {
          es: [
            "Tres aplicaciones, un solo contrato. Reutilizar los tipos entre la API, la web y la CLI eliminó la clase de errores en la que el frontend y el backend discrepan sobre la forma de un dato, y el frontend y el backend se despliegan por separado, de modo que cada uno se opera sin tocar el otro.",
          ],
          en: [
            "Three applications, one contract. Sharing the types across API, web and CLI removed the class of bugs where frontend and backend disagree about the shape of a piece of data, and frontend and backend deploy separately, so each is operated without touching the other.",
          ],
        },
      },
      {
        heading: { es: "Límites conocidos", en: "Known limits" },
        body: {
          es: [
            "La API y la web viven en los planes gratuitos de Render y Vercel, así que la primera carga puede tardar unos segundos mientras el servicio se activa. Para uso real con carga constante, ese arrangement no sostiene.",
          ],
          en: [
            "The API and the web live on the free tiers of Render and Vercel, so the first load can take a few seconds while the service spins up. For real usage with steady traffic, that arrangement does not hold.",
          ],
        },
      },
    ],
    links: [
      {
        href: "https://github.com/amarillaRodrigo/task_tracker",
        label: { es: "Ver el repositorio", en: "View the repository" },
        kind: "repo",
        primary: true,
      },
      {
        href: "https://task-tracker-web-two.vercel.app",
        label: { es: "Ver la demo", en: "View the live demo" },
        kind: "demo",
      },
    ],
  },
];

/** The two projects that lead the page. */
export const featuredProjects = projects.filter((p) =>
  ["journal-api", "postulado"].includes(p.slug),
);

/** The compact grid below them. */
export const otherProjects = projects.filter(
  (p) => !["journal-api", "postulado"].includes(p.slug),
);

/** The project with a verified live demo. There is exactly one. */
export const liveProject = otherProjects.find(
  (p) => p.links.some((l) => l.kind === "demo"),
);

export function getProject(slug: string): CaseStudy | undefined {
  return projects.find((p) => p.slug === slug);
}

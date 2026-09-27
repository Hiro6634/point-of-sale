# Protocolo de contribucion

Este documento existe porque el flujo del repo se aprendia de memoria. Sin
esto escrito, "commiteo directo a `dev` porque es mas rapido" no es una
violacion visible: nadie la ve hasta que dos ramas tienen el mismo fix con
distinto patch-id y hay que resolver el conflicto a mano.

## Flujo

```
feature/HU-xxx-<descripcion>   <- se crea desde origin/main, NUNCA desde otra branch
        |
        |  Pull Request  (requiere revision)
        v
   main                          <- unico punto de integracion
        |
        |  PR
        v
epic/POS-x-<descripcion>        <- agrupa las HUs de una epica
        |
        |  PR + tag
        v
version-x.y.z                   <- se corta desde main, se borra al publicar
```

Reglas que no se negocian:

- **Todo entra por feature branch + PR.** Push directo a `main`, `dev`,
  `epic/*` o `version/*` esta prohibido. Es la causa de los tres commits
  "Netlify issues" duplicados que hoy estan en la historia.
- **Las branches se cortan siempre desde `origin/main`.** No desde `dev`, ni
  desde `version-*`, ni desde el epic anterior. Una branch-cutting de una base
  vieja se pierde trabajo silenciosamente: la base de HU-010 quedo en `642d936`
  y le faltaban el tema, las categorias, `qty: 0` y el fix de Netlify.
- **Un fix entra por su propia branch**, aunque parezca de una linea. El
  atajo de commitearlo en la linea larga es lo que multiplica los parches.
- **`main` es el unico punto de integracion.** `dev` y `version-*` no son
  ramas de trabajo; si hacen falta, se crean desde `main` y se borran.

## Prefijos de branch

| Prefijo      | Para                                                          |
| ------------ | ------------------------------------------------------------- |
| `feature/`   | Historias de usuario. `feature/HU-010-agregar-productos-al-ticket` |
| `fix/`       | Correcciones de bug. `fix/qty-que-no-sumaba`                 |
| `chore/`     | Mantenimiento sin cambio de comportamiento. `chore/bump-version` |
| `docs/`      | Documentacion. `docs/protocolo-de-contribucion`              |
| `epic/`      | Agrupacion de HUs. `epic/POS-3-catalogo`                     |

Numero de epic con padding consistente: `POS-1`, `POS-2`, `POS-3`, `POS-4`.
Hoy conviven `POS-3-catalogo` y `POS-004-tickets-de-venta`.

## Trazabilidad epic <-> HU

Cada `feature/HU-xxx` pertenece a una epica, y cada PR lo declara en el
titulo. El squash o el merge commit debe dejar el `HU-xxx` visible en el
subject, como `HU-010: ...`.

Si una HU no tiene branch propia, la epica lo cubre y el PR lo aclara.
Hoy faltan `HU-004` y `HU-006` en la secuencia: si fueron cubiertas dentro de
una epica, conviene dejarlo escrito; si se perdieron, hay que recuperarlos.

## Commits

- Subject en imperativo, sin punto final: `HU-010: agrega productos al ticket`.
- Un commit, una cosa. Si el subject necesita una "y", probably son dos.
- El body explica el por que. El que ya se ve en el diff no hace falta.

## Branches que ya no sirven

Hay ~15 ramas de la app anterior (la de 2022-2024, con Redux y otra
estructura) que confunden a las herramientas y a cualquier agente que lea el
repo. Cuando se limpien, borrarlas en origen:

```
Develop  FinMarzo2024  master  dev-2023-OCt  dev-01
Netlify2  Refactor  local  no-printer  publish  gh-pages
tailwindcss  update-dev  netlify-deploy
```

`version-0.2.0` tambien: contiene artefactos de build commiteados en
`.subtest/`.

## Branch protection

La regla de arriba solo se sostiene con branch protection activa. En GitHub,
Settings -> Rules -> Rulesets, sobre `main`, `dev`, `epic/*` y `version/*`:

- Require a pull request before merging
- Require at least 1 approving review
- Block force pushes y block deletion

Sin esto, la regla es una sugerencia.

## Variables de entorno y secretos

Regla corta: **toda variable `VITE_` es publica**. Vite la incrusta en el
bundle del browser, asi que para cualquiera que abra la app. De ahi sale la
consecuencia practica que ya nos mordio: si un archivo del repo contiene
literalmente el valor de una variable `VITE_`, el secrets scanner de Netlify
falla el build, porque no puede distinguir un path de Firestore de una
credencial.

Por eso:

- Los defaults de configuracion no se hardcodean. `src/config.js` valida que
  `VITE_CATALOG_ROOT` exista y falla al arrancar si no; no tiene fallback.
- `.env.example` documenta las variables y las deja **vacias**. Si un
  ejemplo trae el valor real, reproduce el mismo falso positivo.
- `netlify.toml` esta en el repo con el `SECRETS_SCAN_OMIT_KEYS` de las ocho
  variables `VITE_`, que son publicas por diseno. El acceso lo protegen las
  security rules de Firestore, no ocultar la clave.
- Un secreto real (service account, token de pago) no lleva prefijo `VITE_`
  y no vive en el bundle: va en el backend.

## Historial

Los commits que se agregaron por fuera del protocolo estan listados en
`.git-blame-ignore-revs`, con el motivo de cada uno. No se reescribio la
historia: `main` es compartida y el costo no vale la ganancia.

Para que `git blame` los ignore:

```bash
git config blame.ignoreRevsFile .git-blame-ignore-revs
```

## Antes de abrir el PR

```bash
npm run lint
npm run build
```

Y verificar que la branch sale de `origin/main`:

```bash
git merge-base --is-ancestor origin/main HEAD && echo "ok"
```

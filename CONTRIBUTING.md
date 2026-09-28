# Protocolo de contribucion

Este documento existe porque el flujo del repo se aprendia de memoria. Sin
esto escrito, "commiteo directo a `dev` porque es mas rapido" no es una
violacion visible: nadie la ve hasta que dos ramas tienen el mismo fix con
distinto patch-id y hay que resolver el conflicto a mano.

## Flujo

El flujo tiene cinco tramos. `dev` y `main` son dos estados distintos del mismo
trabajo: `dev` es donde se prueba, `main` es lo publicado.

```
feature/HU-xxx-<descripcion>   <- se corta desde la epic a la que pertenece
        |
        |  Pull Request
        v
epic/POS-x-<descripcion>        <- acumula las HUs de una epica
        |
        |  PR, cuando la epica esta completa
        v
version-x.y.z-dev                <- se corta desde la epic
        |
        |  Pull Request
        v
dev                              <- integracion: se prueba aca
        |
        |  PR + tag, al publicar
        v
version-x.y.z                    <- se corta desde dev, no desde la epic
        |
        |  Pull Request
        v
main
```

Reglas que no se negocian:

- **Todo entra por feature branch + PR.** Push directo a `main`, `dev`,
  `epic/*` o `version/*` esta prohibido. Es la causa de los tres commits
  "Netlify issues" duplicados que hoy estan en la historia.
- **Una feature se corta desde la epic que la va a contener**, no desde `main`
  ni desde `dev`. Si la epic ya esta integrada en `main`, entonces desde `main`.
- **Una base vieja se pierde trabajo silenciosamente.** La base de HU-010
  quedo en `642d936` y le faltaban el tema, las categorias, `qty: 0` y el fix
  de Netlify. Cortar de la epic vigente, no de donde quede la rama.
- **Un fix entra por su propia branch**, aunque parezca de una linea. El
  atajo de commitearlo en la linea larga es lo que multiplica los parches.
- **`epic/*` y `version-*` son puntos de integracion, no ramas de trabajo.**
  Reciben trabajo de otras branches por PR. `main` y `dev` son donde aterriza
  una version; ninguna de las dos se commitea directo.
- **`version-x.y.z` se corta desde `dev`, nunca desde la epic ni desde
  `main`.** Es lo que sostiene el invariante de abajo: si la release se
  cortara de otro lado, `main` podria recibir commits que `dev` no tiene.

El tramo `epic -> version` es el que se salteo antes: `epic/POS-3-catalogo`
llego a `version-0.3.0` por merge directo (`49e53d5`) en vez de por PR, y por
eso ese commit esta en `.git-blame-ignore-revs`.

## dev

`dev` es el entorno donde se prueba lo que ya esta integrado en una epic, no
una rama de trabajo. Ahi se prueba una HU antes de publicarla.

**Invariante: `main` nunca tiene un commit que `dev` no tenga.** Se sostiene
solo si `dev` va siempre adelante o a la par. Cuando `main` avanza, `dev` tiene
que avanzar en el mismo movimiento:

```bash
git merge-base --is-ancestor origin/main origin/dev && echo "invariante ok"
```

Si eso falla, significa que `main` tiene trabajo sin probar: se mergea `main`
a `dev` por PR y se sigue.

Por eso el orden importa: la release entra primero a `dev` via
`version-x.y.z-dev`, y recien despues a `main`. Al reves, `main` queda con
commits que nadie probo.

Chequeo rapido del estado antes de mergear algo a `main`:

```bash
git rev-list --count origin/dev..origin/main   # tiene que dar 0
```

## Prefijos de branch

| Prefijo      | Para                                                          |
| ------------ | ------------------------------------------------------------- |
| `feature/`   | Historias de usuario. `feature/HU-010-agregar-productos-al-ticket` |
| `fix/`       | Correcciones de bug. `fix/qty-que-no-sumaba`                 |
| `chore/`     | Mantenimiento sin cambio de comportamiento. `chore/bump-version` |
| `docs/`      | Documentacion. `docs/protocolo-de-contribucion`              |
| `epic/`      | Agrupacion de HUs. `epic/POS-3-catalogo`                     |
| `version/`   | Rama de version. `version-0.3.0-dev` -> `dev`, `version-0.3.0` -> `main`. |
| `dev`        | Integracion. Se prueba aca lo que ya esta en una epic.        |

El sufijo `-dev` en la rama de version no es decorativo: `version-x.y.z-dev`
es la que aterriza en `dev`, y `version-x.y.z` sin sufijo es la que aterriza
en `main`. Hoy conviven `version-0.1.0-dev`, `version-0.3.0-dev` y
`version-0.3.0`. Las tres estan cerradas: su contenido ya esta en `main` y en
`dev`, y se pueden borrar.

Numero de epic con padding consistente: `POS-1`, `POS-2`, `POS-3`, `POS-4`.
La epic de tickets se renombro de `POS-004-tickets-de-venta` a
`POS-4-tickets-de-venta` para cerrar el padding.

## Trazabilidad epic <-> HU

Cada `feature/HU-xxx` pertenece a una epica, y cada PR lo declara en el
titulo. El squash o el merge commit debe dejar el `HU-xxx` visible en el
subject, como `HU-010: ...`.

Si una HU no tiene branch propia, la epica lo cubre y el PR lo aclara.
Hoy faltan `HU-004` y `HU-006` en la secuencia: si fueron cubiertas dentro de
una epica, conviene dejarlo escrito; si se perdieron, hay que recuperarlos.

## Commits

- Subject en imperativo, sin punto final: `HU-010: agrega productos al ticket`.
- Un commit, una cosa. Si el subject necesita una "y", probablemente son dos.
- El body explica el por que. El que ya se ve en el diff no hace falta.

## Ramas de la app anterior

La app de 2022-2024 (la de Redux, otra estructura) vivio en unas 15 ramas que
ya no sirven. Estaban borradas del remoto y de lo local:

```
Develop  FinMarzo2024  master  dev-2023-OCt  dev-01
Netlify2  Refactor  local  no-printer  publish  gh-pages
tailwindcss  update-dev  netlify-deploy  version-0.2.0
```

Antes de borrarlas se creo un tag `archive/<nombre>` por rama apuntando a la
punta original, asi que la historia sigue disponible:

```bash
git branch recuperar Develop archive/Develop
```

`version-0.2.0` tambien: contenia artefactos de build commiteados en
`.subtest/`. Sus dos puntas quedaron cubiertas: la remota en
`archive/version-0.2.0`, la local ya estaba en `main`.

## Branch protection

Sin esto, todo lo de arriba es una sugerencia.

Estado actual, verificado por la API de reglas:

| Rama           | Protegida                                          |
| -------------- | -------------------------------------------------- |
| `main`         | si — deletion, non_fast_forward, pull_request      |
| `dev`          | si — las mismas tres                               |
| `epic/*`       | no                                                 |
| `version/*`    | no                                                 |

En Settings -> Rules -> Rulesets. Lo importante:

- **Enforcement en `Active`.** Una ruleset en `disabled` existe pero no
  bloquea nada. Es el paso que mas veces se olvida.
- **El ref tiene que existir.** Una ruleset apuntando a `refs/heads/Dev` no
  protege `dev`: las refs distinguen mayusculas. Chequear con
  `GET /repos/<owner>/<repo>/rules/branches/<branch>`, que devuelve las reglas
  que *aplicarian* a esa rama.
- **El default branch conviene con `~DEFAULT_BRANCH`** en vez del nombre
  escrito, asi la regla sobrevive a un cambio de rama por defecto.
- **Require a pull request before merging**, y **block force pushes** y
  **block deletion**.

Sobre el conteo de aprobaciones: hoy esta en 0, o sea que el PR se puede
mergear apenas se abre. Subirlo a 1 obliga a que las aprobaciones las de
alguien, y en un repo personal eso termina siendo vos revisando tu propio
trabajo. Es una decision, no un default sensato: dejalo en 0 mientras trabajas
solo y subilo cuando entren mas manos.

`epic/*` y `version/*` reciben trabajo por PR pero no tienen ruleset. Si se
quiere cerrar del todo el circuito, hay que agregarlas.

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

Y verificar que la branch sale de la epic que la va a contener, no de una base
vieja. Para una feature de `epic/POS-4-tickets-de-venta`:

```bash
git merge-base --is-ancestor origin/epic/POS-4-tickets-de-venta HEAD && echo "ok"
```

Si la epic ya esta integrada, el check es contra `origin/main`. Y antes de
pushear la rama nueva, con refspec explicito: las branches de este repo
trackean a veces contra `origin/main` y un `git push` a secas termina
pusheando a la rama equivocada.

```bash
git push -u origin feature/HU-010-agregar-productos-al-ticket:feature/HU-010-agregar-productos-al-ticket
```

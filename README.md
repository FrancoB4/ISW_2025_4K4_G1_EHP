# ISW_G1_4K4_2025
Repositorio para la materia ingenieria y calidad de software, del curso 4k4 - Grupo 1.

# Integrantes del grupo
| Nombre | Legajo | Mail
| ------------ | ------------ | ------------ | 
| Benjamin Cimatti | 94312 | benja.cimatti@gmail.com |
| Daiana Jacqueline Makula | 89209 | daianamakula@gmail.com |
| Daniel Pastor Reinoso | 92264 |  | 
| Francisco José Rodriguez | 78741 | rodriguezfranciscojm@gmail.com |
| Franco Bonfiglio Vazquez | 96490 | francobonfigliovazquez@gmail.com | 
| Joaquin Ernesto Koncurat | 85216 | joaquinkoncurat@gmail.com |
| Lucio Morales Demaria | 94289 | lucio.moralesdemaria@gmail.com | 
| Milagros Galiano | 89513 | miligaliano@gmail.com |
| Milena Rodriguez | 81323 | miluflor.rodriguez@gmail.com |
| Santino Zahir Chamia | 95001 | santinochamia1192@gmail.com | 

## Estructura de archivos
- ISW_2025_4K4_G1_EHP
  - **base_line**
  - **main**
    - **project**
      - design
      - deployment
      - implementation
      - meetings
      - plannings
      - requirements
      - sprints
        - sprint<NN>
          - sprint_backing
          - sprint_metrics
      - tests_documentation
    - **product**
      - architecture
      - assets
        - icons
      - design
      - deployment
      - requirements
        - user_stories
      - scripts
      - src
        - backend
          - API
          - test_back
        - frontend
          - android
            - test_android
          - ios
            - test_ios
      - user_manuals
        - non_technical_manual
        - technical_manual
  

## Listado de ítems de configuración

| Ítem de Configuración | Regla de Nombrado | Ubicación Física | Tipo de Ítem |
|-----------------------|------------------|------------------|--------------|
| Documento de Línea Base | EHP_DOC_BASE_LINE_<ITERxx>_<NAME_BL>_<NN>.docx | base_line/ | Iteración |
| Historias de Usuario | EHP_US_<NN>.docx | main/product/requirements/user_stories/ | Producto |
| Especificación de Requerimientos de Software | EHP_ERS_<NN>.docx | main/project/requirements/ | Proyecto |
| Manual de Usuario Técnico | EHP_TECHNICAL_USER_MANUAL_<NN>.pdf | main/product/user_manuals/technical_manuals/ | Producto |
| Manual de Usuario No Técnico | EHP_NONTECHNICAL_USER_MANUAL_<NN>.pdf | main/product/user_manuals/non_technical_manuals/ | Producto |
| Casos de Uso | EHP_CU_<CU_NAME>_<Nro.CU>.docx | main/product/requirements/ | Producto |
| Diagrama de Casos de Uso | EHP_DIAG_CU.eap | main/product/requirements/ | Producto |
| Documento de Diseño | EHP_DOC_DESIGN.docx | main/product/design/ | Producto |
| Documento de Pruebas | EHP_DOC_TEST_<NN>.docx | main/project/tests_documentation/ | Iteración |
| Pruebas de Android | EHP_TEST_ANDROID<NN>.<extensión> | main/src/frontend/android/test_android/ | Iteración |
| Pruebas de iOS | EHP_TEST_IOS_<NN>.<extensión> | main/src/frontend/ios/test_ios/ | Iteración |
| Scripts de Automatización | EHP_SCRIPT_<NN>.<extensión> | main/product/scripts/ | Producto |
| Plan de Despliegue | EHP_DEPLOYMENT_PLAN.docx | main/project/deployment/ | Proyecto |
| Plan de Desarrollo de Software | EHP_DEV_PLAN.docx | main/project/plannings/ | Proyecto |
| Íconos y Recursos Gráficos | EHP_ICON_<NN>.<extensión> | main/assets/icons/ | Producto |
| API | EHP_API_<NOMBRE_COMPONENTE>.<extensión> | main/src/backend/API/ | Producto |
| Pruebas de Backend | EHP_TEST_BACK_<NN>.<extensión> | main/src/backend/test_back/ | Iteración |
| Código Fuente Backend | EHP_BACK_<NOMBRE_COMPONENTE>.<extensión> | main/src/backend/ | Producto |
| Código Fuente Android | EHP_ANDROID_<NOMBRE_COMPONENTE>.<extensión> | main/src/frontend/android | Producto |
| Código Fuente iOS | EHP_IOS_<NOMBRE_COMPONENTE>.<extensión> | main/src/frontend/ios | Producto |
| Base de Datos | EHP_DB_<NOMBRE_COMPONENTE>.<extensión> | main/src/db | Producto |
| Diseño de Arquitectura | EHP_ARCH_<ITERxx>.docx | main/design/architecture | Proyecto |
| Product Backlog | EHP_PRODUCT_BACKLOG_<ITERxx>.xlsx | main/project/plannings/ | Proyecto |
| Sprint Backlog | EHP_SPRINT_BACKLOG_<ITERxx>_<SPRINTxx>.xlsx | main/sprints/sprint_<NN>/sprint_backlog/ | Iteración |
| Sprint Review | EHP_SPRINT_REVIEW_<ITERxx>_<SPRINTxx>.docx | main/meetings/ | Iteración |
| Métricas del Sprint | EHP_SPRINT_METRICS_<ITERxx>_<SPRINTxx>.xlsx | sprints/sprint_<NN>/sprint_metrics/ | Iteración |
| Métricas del Proyecto | EHP_PROJECT_METRICS.xlsx | main/project/plannings/ | Proyecto |
| Minuta de Relevamiento | EHP_MINUTA_<YYYYMMDD>_<HHMM>_<ASUNTO>.docx | main/meetings/ | Iteración |


## Glosario
| Sigla| Significado |
| ------------ | ------------ |
| \<EHP\> | EcoHarmony Park. |
| \<ITERxx\> | Número de la iteración del proyecto. Ejemplo: ITER02. |
| \<NN\> | Número cardinal comenzando en 00. |
| \<CU_NAME\> | Nombre del Caso de Uso. |
| \<US_NAME\> | Nombre de la User Story. |
| \<Nro.CU\> | Número del Caso de Uso. |
| \<extension\> | Nombre de la extensión de un archivo identificado como ítem de configuración. |
| \<SPRINTxx\> | Número del Sprint. Ejemplo: SPRINT03. |
| \<YYYYMMDD\> | Fecha en formato numérico (AñoMesDía). Ejemplo: 20250330. |
| \<HHMM\> | Hora de inicio en formato numérico (HoraMinutos). Ejemplo: 1430. |
| \<ASUNTO\> | Asunto de minuta de reunión. |
| \<NOMBRE_COMPONENTE\> | Nombre del componente. |
| \<NAME_BL\> | Nombre de la línea base. Se especifica tipo de línea base. |


## Criterio de línea base

Criterio de línea base
Como grupo, hemos decidido que el momento para definir una nueva línea base será cuando el producto alcance un hito u objetivo importante en términos de funcionalidad, habiendo sido previamente testeado y validado para garantizar su estabilidad. Para ello, nos aseguraremos de que todas las funcionalidades clave estén implementadas, que no existan errores críticos y que la versión cumpla con los requisitos acordados. Además, la documentación e items de configuración asociados deberán estar actualizados, y el código deberá haber pasado por las revisiones necesarias antes de ser marcado como línea base en el repositorio.


Líneas base disponibles: 

| Nombre | Fecha | Descripción
| ------------ | ------------ | ------------ | 
| v1.0 | 25/03/2025 | Repositorio en su primera versión. | 





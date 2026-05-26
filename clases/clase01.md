# Clase 01 — Fundamentos de la Web

**Curso:** Programación en Ambiente Web I (ISW-521)  
**Docente:** Bladimir Arroyo B.  
**Institución:** UTN — Sede San Carlos  
**Ciclo:** 2026 — II Cuatrimestre  

---

## Temas vistos

### 1. Arquitectura y Evolución de la Red Global

- Internet vs WWW
- Evolución
- Modelo Cliente-Servidor
- Gobernanza

---

### 2. Internet · Intranet · Extranet

| Tipo | Usuarios | Autenticación | Ejemplo UTN |
|---|---|---|---|
| Internet | Cualquiera | Opcional | utn.ac.cr público |
| Intranet | Solo empleados/miembros | Siempre | Sistema SIGA interno |
| Extranet | Socios autorizados | Siempre | Portal de empresas socias |

---

### 3. Anatomía y Diseño de URLs / URIs

- **URI** es el identificador genérico. 
**URL** especifica la ubicación. 
**URN** identifica por nombre persistente.
- **Partes de una URL:** 
`esquema://userinfo@host:puerto/ruta?query#fragmento`
- **URL Encoding:** Los caracteres especiales se codifican con `%XX`. En JS: `encodeURIComponent()`.
- **Clean URLs:** Legibles, sin IDs de base de datos, sin extensiones `.php`. Usar guiones `-` para separar palabras, nunca guion bajo.

---

### 4. Sistema de Nombres de Dominio (DNS)

- El DNS traduce nombres de dominio a direcciones IP. Sin él, habría que memorizar IPs.
- **Árbol de dominios:** Raíz (`.`) → TLD (`.cr`, `.com`) → SLD (`utn.ac`) → Subdominio (`campus`).
- **ICANN** coordina el espacio global de nombres. 
- **NIC Costa Rica** (UCR) administra el TLD `.cr`.
- Un subdominio lo crea el dueño del SLD en su propio servidor DNS, sin pago externo.
- **Ciclo de vida:** Búsqueda → Registro → Configuración DNS → Período activo → Renovación → Expiración.


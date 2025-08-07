---
title: "Por qué uso una Arquitectura SASS Profesional"
date: "2025-07-25"
excerpt: "Un vistazo a cómo la modularidad de SASS puede transformar un proyecto de CSS caótico en una base de código limpia y escalable."
---

## El Problema del CSS a Gran Escala

Cuando un proyecto crece, el CSS puede volverse un monstruo. Selectores que se pisan, reglas duplicadas y el temido `!important` empiezan a aparecer.

### La Solución: Modularidad

La clave es dividir. Usando la arquitectura de parciales que hemos implementado en este portfolio (`abstracts`, `components`, `layout`...), logramos que cada pieza de la interfaz tenga su propio archivo de estilos.

* **Mantenible:** Si querés cambiar el botón, solo tocás `_buttons.scss`.
* **Escalable:** Añadir una nueva sección es tan simple como crear un nuevo archivo.

Este enfoque no es solo una buena práctica, es una necesidad para cualquier proyecto serio que busque crecer a largo plazo.
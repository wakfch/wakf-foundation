# Restauration du projet Centre Al Badr (Le Locle)

Le projet Al Badr est masqué du site public depuis le commit `727e6c9`. Ses données, images et traductions sont restées dans le dépôt.

## 1. Réafficher le projet

Dans `src/data/projects.js`, supprimer cette ligne de l'entrée `id: 'albadr'` (ou remplacer `true` par `false`) :

```js
    hidden: true, // masqué du site public ; retirer cette ligne pour le réafficher
```

Le projet réapparaît alors partout : accueil, page Projets, menu « Nos projets » et adresses `/projets/centre-al-badr` et `/projets/albadr`.

## 2. Remettre les réponses de la FAQ (facultatif)

Lors du masquage, trois réponses de la FAQ générale ont été réécrites pour ne plus citer Al Badr. Pour les rétablir, remettre à la même clé de `src/locales/<langue>.json` le texte d'origine reproduit ci-dessous.

### Français (`src/locales/fr.json`)

**Clé** `faq.groups[2].items[0].a`  
**Question** : Puis-je faire un don dédié à un projet spécifique ?

```text
Oui. Lors de votre don, vous pouvez préciser le projet que vous souhaitez soutenir parmi nos cinq projets : Mosquée Madretsch (Bienne), Centre Al Iman (Fribourg), Centre Al Badr (Le Locle), Centre An-Nour (Sion) et Bibliothèque Mobile « Ponts du Savoir ». Si le projet est intégralement financé, les fonds seront affectés au projet prioritaire en cours.
```

**Clé** `faq.groups[3].items[0].a`  
**Question** : Quels sont les projets actuels ?

```text
La Fondation Wakef finance cinq projets : Mosquée Madretsch à Bienne (réalisé, 496 m²), Centre Al Iman à Fribourg (en cours, 132 m²), Centre Al Badr au Locle (en cours, 2 029 m²), Centre An-Nour à Sion (en cours, 420 m²) et la Bibliothèque Mobile « Ponts du Savoir » en Suisse romande. Consultez la page Projets pour le détail complet.
```

**Clé** `faq.groups[3].items[2].a`  
**Question** : Puis-je dédier mon don à un projet spécifique ?

```text
Oui. Lors de votre don, vous pouvez préciser le projet que vous souhaitez soutenir (Mosquée Madretsch, Centre Al Iman ou Centre Al Badr). Si le projet est déjà financé, les fonds seront affectés au projet le plus urgent.
```

### English (`src/locales/en.json`)

**Clé** `faq.groups[2].items[0].a`  
**Question** : Can I make a donation dedicated to a specific project?

```text
Yes. When you donate, you can name the project you wish to support among our five projects: Madretsch Mosque (Biel/Bienne), Al Iman Centre (Fribourg), Al Badr Centre (Le Locle), An-Nour Centre (Sion) and the Mobile Library “Ponts du Savoir”. If that project is fully funded, the money will go to the priority project under way.
```

**Clé** `faq.groups[3].items[0].a`  
**Question** : What are the current projects?

```text
Fondation Wakef funds five projects: Madretsch Mosque in Biel/Bienne (completed, 496 m²), Al Iman Centre in Fribourg (ongoing, 132 m²), Al Badr Centre in Le Locle (ongoing, 2,029 m²), An-Nour Centre in Sion (ongoing, 420 m²) and the Mobile Library “Ponts du Savoir” in Romandy. See the Projects page for full details.
```

**Clé** `faq.groups[3].items[2].a`  
**Question** : Can I dedicate my donation to a specific project?

```text
Yes. When you donate, you can name the project you wish to support (Madretsch Mosque, Al Iman Centre or Al Badr Centre). If that project is already funded, the money will go to the most urgent project.
```

### Deutsch (`src/locales/de.json`)

**Clé** `faq.groups[2].items[0].a`  
**Question** : Kann ich für ein bestimmtes Projekt spenden?

```text
Ja. Bei Ihrer Spende können Sie angeben, welches unserer fünf Projekte Sie unterstützen möchten: Moschee Madretsch (Biel/Bienne), Al Iman Zentrum (Freiburg), Al Badr Zentrum (Le Locle), An-Nour Zentrum (Sitten) und Mobile Bibliothek « Ponts du Savoir ». Ist das Projekt vollständig finanziert, fliessen die Mittel in das laufende vorrangige Projekt.
```

**Clé** `faq.groups[3].items[0].a`  
**Question** : Welches sind die aktuellen Projekte?

```text
Die Fondation Wakef finanziert fünf Projekte: Moschee Madretsch in Biel/Bienne (realisiert, 496 m²), Al Iman Zentrum in Freiburg (laufend, 132 m²), Al Badr Zentrum in Le Locle (laufend, 2 029 m²), An-Nour Zentrum in Sitten (laufend, 420 m²) und die Mobile Bibliothek « Ponts du Savoir » in der Westschweiz. Alle Einzelheiten finden Sie auf der Seite Projekte.
```

**Clé** `faq.groups[3].items[2].a`  
**Question** : Kann ich meine Spende einem bestimmten Projekt widmen?

```text
Ja. Bei Ihrer Spende können Sie angeben, welches Projekt Sie unterstützen möchten (Moschee Madretsch, Al Iman Zentrum oder Al Badr Zentrum). Ist das Projekt bereits finanziert, fliessen die Mittel in das dringendste Projekt.
```

### العربية (`src/locales/ar.json`)

**Clé** `faq.groups[2].items[0].a`  
**Question** : هل يمكنني تخصيص تبرعي لمشروع بعينه؟

```text
نعم. عند التبرع، يمكنكم تحديد المشروع الذي ترغبون في دعمه من بين مشاريعنا الخمسة: مسجد مادريتش (بيل)، ومركز الإيمان (فريبورغ)، ومركز البدر (لو لوكل)، ومركز النور (سيون)، والمكتبة المتنقلة « جسور المعرفة ». وإذا كان المشروع ممولًا بالكامل، تُخصَّص الأموال للمشروع ذي الأولوية الجاري.
```

**Clé** `faq.groups[3].items[0].a`  
**Question** : ما هي المشاريع الحالية؟

```text
تموّل مؤسسة الوقف خمسة مشاريع: مسجد مادريتش في بيل (منجز، 496 m²)، ومركز الإيمان في فريبورغ (قيد الإنجاز، 132 m²)، ومركز البدر في لو لوكل (قيد الإنجاز، 2 029 m²)، ومركز النور في سيون (قيد الإنجاز، 420 m²)، والمكتبة المتنقلة « جسور المعرفة » في سويسرا الرومندية. اطّلعوا على صفحة المشاريع للتفاصيل الكاملة.
```

**Clé** `faq.groups[3].items[2].a`  
**Question** : هل يمكنني تخصيص تبرعي لمشروع بعينه؟

```text
نعم. عند التبرع، يمكنكم تحديد المشروع الذي ترغبون في دعمه (مسجد مادريتش، أو مركز الإيمان، أو مركز البدر). وإذا كان المشروع ممولًا بالفعل، تُخصَّص الأموال للمشروع الأكثر إلحاحًا.
```

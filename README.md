# Invyra - Stockmanager
**Projekt: Echtzeit-Warenvorratsüberwachung**

**Disclaimer**: Der Invyra Stockmanager hat wegen Problemen hauptsächlich von Layer 5 bis 8 nicht den gewünschten Umfang. 
Ich habe den Fokus zwischendurch zu stark auf Design/Corporate Identity gelegt das Frontend unterschätzt, wodurch die Funktionalität zu wünschen übrig lässt.


## **1. Projektidee**

Das Projekt ist eine Webanwendung zur Verwaltung von Lagerbeständen in Echtzeit. Es ermöglicht Unternehmen oder Haushalten, Produkte und deren Bestände sowie Bedarfe effizient zu überwachen. Die Anwendung unterstützt verschiedene Benutzerrollen mit abgestuften Berechtigungen.

### **1. Kernfunktionen**

* **Produkte verwalten:** Hinzufügen, Bearbeiten und Löschen von Produkten mit Name, Beschreibung, Preis, Lagerbestand und Bedarf.
* **Echtzeit-Updates:** WebSocket-basierte Aktualisierung der Bestände.
* **Benutzer- und Rechteverwaltung:** Rollenbasierte Zugriffskontrolle für Lagerarbeiter, Administratoren und Betrachter.
* **Bestandsänderungen nachverfolgen:** Protokollierung aller Lagerbewegungen inklusive Grund der Änderung.
* **Statistiken und Warnungen:** Dashboard mit Lageranalysen und Benachrichtigungen bei niedrigem Bestand.

### **2. Technologie-Stack**

* **Frontend:** Angular mit Angular Material für UI-Komponenten.
* **Backend:** Node.js mit Express.js für REST-API.
* **Datenbank:** MySQL mit einer relationalen Struktur für Produkte, Benutzer und Lagerbewegungen.
* **Echtzeit-Kommunikation:** WebSockets für sofortige Bestandsupdates.

### **3. Datenbankstruktur**

* **Benutzerverwaltung:** `users`, `roles`, `permissions`, `user_roles`, `role_permissions`
* **Lagerverwaltung:** `categories`, `products`, `inventory_changes`
* **Verknüpfungen:** Fremdschlüssel stellen sicher, dass Lagerbewegungen und Berechtigungen korrekt zugewiesen werden.

### **4. Frontend-Struktur**

* **Core-Modul:** Authentifizierung, WebSocket-Service
* **Shared-Modul:** Wiederverwendbare Komponenten (z. B. Tabellen, Buttons)
* **Feature-Module:** `inventory`, `users`, `dashboard` mit eigenen Routen
* **Routing:** Route-Guards für Rollenbasierte Berechtigungen


## 2. Umsetzung

### 1. Backend

Das Backend ist, wie von Ihnen verlangt, in Node.js mit Express.js implementiert. Es bietet eine REST-API für CRUD-Operationen auf Produkten und Benutzern sowie WebSocket-Unterstützung für Echtzeit-Updates von stock und demand der Produkte.
Es ist gut ausgebaut, erweiterbar und ich habe versucht, alle Best Practices herauszufinden und zu befolgen.
Es gibt eine klare Trennung zwischen den Routen, Controllern und Services, um die Wartbarkeit zu gewährleisten.
Es enthält viele Sicherheitsmaßnahmen wie Validierung, Authentifizierung und Autorisierung. Diese sind aber derzeit nicht vollständig implementiert, da ich mich auf die Kernfunktionen konzentriert habe.

### 2. Frontend

Das Frontend besteht momentan nur aus einer Produktübersicht. Man kann aktuell weder Produkte hinzufügen, bearbeiten noch löschen.

### 3. Datenbank

Die Datenbank ist in MySQL implementiert und enthält Tabellen für Benutzer, Rollen, Produkte und Lagerbewegungen. Die Struktur ist relational und ermöglicht eine klare Zuordnung von Benutzern zu Rollen und Produkten zu Lagerbewegungen.
Die Struktur für Benutzerverwaltung ist zwar da, jedoch nicht implementiert.

### 4. Design

Bevor die Frontend-Entwicklung begonnen wurde, habe ich ein Design mit Figma erstellt. (siehe assets/Invyra_GUI.png) Ich habe mir auch Gedanken über die Corporate Identity gemacht (Farben, Font, Style, Logo).

## 3. Deployment

Das Projekt ist Container-basiert und kann aus dem root-Verzeichnis mit **docker compose up --build** gestartet werden
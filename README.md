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


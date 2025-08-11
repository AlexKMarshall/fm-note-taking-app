PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_notesToTags` (
	`noteId` integer NOT NULL,
	`tagId` integer NOT NULL,
	PRIMARY KEY(`noteId`, `tagId`),
	FOREIGN KEY (`noteId`) REFERENCES `notes`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`tagId`) REFERENCES `tags`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_notesToTags`("noteId", "tagId") SELECT "noteId", "tagId" FROM `notesToTags`;--> statement-breakpoint
DROP TABLE `notesToTags`;--> statement-breakpoint
ALTER TABLE `__new_notesToTags` RENAME TO `notesToTags`;--> statement-breakpoint
PRAGMA foreign_keys=ON;
CREATE TABLE `Addresses` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `longitude` double DEFAULT NULL,
  `latitude` double DEFAULT NULL,
  `street` varchar(900) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE `Modules` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(60) COLLATE utf8_unicode_ci NOT NULL,
  `collapsed` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE `Teams` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(60) COLLATE utf8_unicode_ci NOT NULL,
  `description` text COLLATE utf8_unicode_ci,
  `leader` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE `Users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(90) COLLATE utf8_unicode_ci NOT NULL,
  `firstName` varchar(60) COLLATE utf8_unicode_ci DEFAULT NULL,
  `lastName` varchar(60) COLLATE utf8_unicode_ci DEFAULT NULL,
  `password` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `passwordSalt` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE `Tasks` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `module` int(11) DEFAULT NULL,
  `title` varchar(60) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `dueDate` date DEFAULT NULL,
  `owner` int(11) DEFAULT NULL,
  `priority` varchar(15) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `state` varchar(15) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `address` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_tasks_modules_idx` (`module`),
  KEY `fk_tasks_users_idx` (`owner`),
  KEY `fk_tasks_addresses_idx` (`address`),
  CONSTRAINT `fk_tasks_addresses` FOREIGN KEY (`address`) REFERENCES `Addresses` (`id`),
  CONSTRAINT `fk_tasks_modules` FOREIGN KEY (`module`) REFERENCES `Modules` (`id`),
  CONSTRAINT `fk_tasks_users` FOREIGN KEY (`owner`) REFERENCES `Users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE `TeamUsers` (
  `user` int(11) NOT NULL,
  `team` int(11) NOT NULL,
  `role` varchar(15) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`user`,`team`),
  KEY `fk_teamusers_teams_idx` (`team`),
  CONSTRAINT `fk_teamusers_teams` FOREIGN KEY (`team`) REFERENCES `Teams` (`id`),
  CONSTRAINT `fk_teamusers_users` FOREIGN KEY (`user`) REFERENCES `Users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- MySQL dump 10.13  Distrib 8.0.21, for Win64 (x86_64)
--
-- Host: localhost    Database: trabajo_final_v1
-- ------------------------------------------------------
-- Server version	8.0.21

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `carrito`
--

DROP TABLE IF EXISTS `carrito`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `carrito` (
  `id_carrito` int NOT NULL AUTO_INCREMENT,
  `cantidad` int DEFAULT NULL,
  `cliente_id_cliente` int NOT NULL,
  `producto_id_producto` int NOT NULL,
  `estado` varchar(45) NOT NULL,
  PRIMARY KEY (`id_carrito`),
  KEY `fk_carrito_cliente1_idx` (`cliente_id_cliente`),
  KEY `fk_carrito_producto1_idx` (`producto_id_producto`),
  CONSTRAINT `fk_carrito_cliente1` FOREIGN KEY (`cliente_id_cliente`) REFERENCES `cliente` (`id_cliente`),
  CONSTRAINT `fk_carrito_producto1` FOREIGN KEY (`producto_id_producto`) REFERENCES `producto` (`id_producto`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carrito`
--

LOCK TABLES `carrito` WRITE;
/*!40000 ALTER TABLE `carrito` DISABLE KEYS */;
INSERT INTO `carrito` VALUES (12,1,2,2,'pendiente'),(13,5,2,1,'pendiente'),(14,1,3,4,'pendiente'),(15,1,3,6,'pendiente'),(17,7,2,9,'pendiente'),(18,1,2,2,'pendiente'),(20,1,2,11,'pendiente'),(21,1,2,2,'pendiente'),(22,1,2,12,'pendiente'),(24,1,2,2,'pendiente'),(28,2,3,14,'pendiente'),(29,8,3,2,'pendiente'),(30,1,3,2,'pendiente');
/*!40000 ALTER TABLE `carrito` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categoria`
--

DROP TABLE IF EXISTS `categoria`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categoria` (
  `id_categoria` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) NOT NULL,
  PRIMARY KEY (`id_categoria`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categoria`
--

LOCK TABLES `categoria` WRITE;
/*!40000 ALTER TABLE `categoria` DISABLE KEYS */;
INSERT INTO `categoria` VALUES (1,'peliculas'),(2,'gamer'),(3,'anime'),(4,'curiosidades');
/*!40000 ALTER TABLE `categoria` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cliente`
--

DROP TABLE IF EXISTS `cliente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cliente` (
  `id_cliente` int NOT NULL AUTO_INCREMENT,
  `usuario` varchar(16) NOT NULL,
  `pass` varchar(45) NOT NULL,
  `administrador` tinyint NOT NULL,
  PRIMARY KEY (`id_cliente`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cliente`
--

LOCK TABLES `cliente` WRITE;
/*!40000 ALTER TABLE `cliente` DISABLE KEYS */;
INSERT INTO `cliente` VALUES (1,'lucas','1234',1),(2,'mauricio','1234',1),(3,'rocio','1234',1),(4,'carlos','12345',0),(5,'jose','1234',0),(6,'pepito','123',0),(7,'rober','1234',0),(8,'martin','12345',0),(9,'sol','1234',0);
/*!40000 ALTER TABLE `cliente` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `detalle_factura`
--

DROP TABLE IF EXISTS `detalle_factura`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `detalle_factura` (
  `id_detalle_factura` int NOT NULL AUTO_INCREMENT,
  `cantidad` int NOT NULL,
  `total` int NOT NULL,
  `producto_id_producto` int NOT NULL DEFAULT '0',
  `factura_id_factura` int NOT NULL,
  PRIMARY KEY (`id_detalle_factura`),
  KEY `fk_detalle_factura_producto1_idx` (`producto_id_producto`),
  KEY `fk_detalle_factura_factura1_idx` (`factura_id_factura`),
  CONSTRAINT `fk_detalle_factura_factura1` FOREIGN KEY (`factura_id_factura`) REFERENCES `factura` (`id_factura`) ON UPDATE CASCADE,
  CONSTRAINT `fk_detalle_factura_producto1` FOREIGN KEY (`producto_id_producto`) REFERENCES `producto` (`id_producto`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `detalle_factura`
--

LOCK TABLES `detalle_factura` WRITE;
/*!40000 ALTER TABLE `detalle_factura` DISABLE KEYS */;
INSERT INTO `detalle_factura` VALUES (1,1,1810,12,1),(2,3,900,10,2),(3,2,150,1,3),(4,7,300,2,4),(5,1,400,6,5),(6,10,600,9,6),(7,4,1500,1,7),(8,2,2000,11,8),(9,1,1700,4,9);
/*!40000 ALTER TABLE `detalle_factura` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `factura`
--

DROP TABLE IF EXISTS `factura`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `factura` (
  `id_factura` int NOT NULL AUTO_INCREMENT,
  `fecha` date DEFAULT NULL,
  `cliente_id_cliente` int NOT NULL,
  PRIMARY KEY (`id_factura`),
  KEY `fk_factura_cliente1_idx` (`cliente_id_cliente`),
  CONSTRAINT `fk_factura_cliente1` FOREIGN KEY (`cliente_id_cliente`) REFERENCES `cliente` (`id_cliente`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `factura`
--

LOCK TABLES `factura` WRITE;
/*!40000 ALTER TABLE `factura` DISABLE KEYS */;
INSERT INTO `factura` VALUES (1,'2020-01-23',2),(2,'2020-01-23',6),(3,'2020-01-23',9),(4,'2020-01-23',4),(5,'2020-01-23',2),(6,'2020-01-23',2),(7,'2020-01-23',9),(8,'2020-01-23',7),(9,'2020-01-23',6);
/*!40000 ALTER TABLE `factura` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `imagen_producto`
--

DROP TABLE IF EXISTS `imagen_producto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `imagen_producto` (
  `id_imagen` int NOT NULL AUTO_INCREMENT,
  `direccion` varchar(255) DEFAULT NULL,
  `producto_id_producto` int NOT NULL,
  PRIMARY KEY (`id_imagen`),
  KEY `fk_imagen_producto_producto1_idx` (`producto_id_producto`),
  CONSTRAINT `fk_imagen_producto_producto1` FOREIGN KEY (`producto_id_producto`) REFERENCES `producto` (`id_producto`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `imagen_producto`
--

LOCK TABLES `imagen_producto` WRITE;
/*!40000 ALTER TABLE `imagen_producto` DISABLE KEYS */;
INSERT INTO `imagen_producto` VALUES (1,'/images/tp/heisenberg.jpg',1),(2,'/images/tp/toy-story.jpg',2),(3,'/images/tp/apoyalibros.jpg',3),(4,'/images/tp/mariobros.jpg',4),(5,'/images/tp/ryuk.jpg',5),(6,'/images/tp/saga.jpg',6),(7,'/images/tp/llavero-foto.jpg',7),(8,'/images/tp/cat.jpg',8),(9,'/images/tp/fenix.jpg',9),(10,'/images/tp/diorama-vaf.jpg',10),(11,'/images/tp/galadriel.jpg',11),(12,'/images/tp/eva01.jpg',12),(13,'sin imagen',13),(14,'sin imagen',14);
/*!40000 ALTER TABLE `imagen_producto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pedido_personalizado`
--

DROP TABLE IF EXISTS `pedido_personalizado`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pedido_personalizado` (
  `id_pedido` int NOT NULL AUTO_INCREMENT,
  `dimesion_x` int DEFAULT NULL,
  `dimension_y` int DEFAULT NULL,
  `dimension_z` int DEFAULT NULL,
  `colores` varchar(255) DEFAULT NULL,
  `tipo_filamento` varchar(45) DEFAULT NULL,
  `altura_capa` int DEFAULT NULL,
  `temperatura` int DEFAULT NULL,
  `relleno` int DEFAULT NULL,
  `comentarios` varchar(255) DEFAULT NULL,
  `cliente_id_cliente` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id_pedido`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pedido_personalizado`
--

LOCK TABLES `pedido_personalizado` WRITE;
/*!40000 ALTER TABLE `pedido_personalizado` DISABLE KEYS */;
INSERT INTO `pedido_personalizado` VALUES (1,33,33,33,'33','Filamento PLA',33,33,33,'33','2'),(2,1,1,1,'1','Filamento PLA',1,1,1,'1','3');
/*!40000 ALTER TABLE `pedido_personalizado` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `producto`
--

DROP TABLE IF EXISTS `producto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `producto` (
  `id_producto` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) DEFAULT NULL,
  `descripcion` varchar(255) DEFAULT NULL,
  `precio` int DEFAULT NULL,
  `stock` int DEFAULT NULL,
  `categoria_id_categoria` int DEFAULT '0',
  `pedido_personalizado_id_pedido` int DEFAULT NULL,
  PRIMARY KEY (`id_producto`),
  KEY `fk_producto_categoria1_idx` (`categoria_id_categoria`),
  KEY `fk_producto_pedido_personalizado1_idx` (`pedido_personalizado_id_pedido`),
  CONSTRAINT `fk_producto_categoria1` FOREIGN KEY (`categoria_id_categoria`) REFERENCES `categoria` (`id_categoria`),
  CONSTRAINT `fk_producto_pedido_personalizado1` FOREIGN KEY (`pedido_personalizado_id_pedido`) REFERENCES `pedido_personalizado` (`id_pedido`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `producto`
--

LOCK TABLES `producto` WRITE;
/*!40000 ALTER TABLE `producto` DISABLE KEYS */;
INSERT INTO `producto` VALUES (1,'Heisenberg','Figura decorativa de Breaking Bad',1800,10,1,NULL),(2,'toy-story','Figura de woody',1800,10,1,NULL),(3,'Apoya libros','Producto decorativo para sostener libros',1800,10,2,NULL),(4,'Mario Bros','Macetas con motivos de Mario Bros',1800,10,2,NULL),(5,'Ryuk','Figura de Shinigami Ryuk',1800,10,3,NULL),(6,'Saga','Figura de Saga de Sagitario CDZ',1900,10,3,NULL),(7,'Llavero-Foto','Laveros personalizados mediante foto',1,10,4,NULL),(8,'Cat','Figura de gatito para sostener celulares',1,10,4,NULL),(9,'Fenix','Figura Ikki Fenix CDZ',1800,10,3,NULL),(10,'Diorama Vaf','Diorama de Volver al Futuro',1,10,1,NULL),(11,'Galadriel','FIgura con base Galadriel Señor de los anillos',1,10,1,NULL),(12,'Eva 01','Figura de EVA01 Evangelion',1,10,3,NULL),(13,'sdf','erwr',22,1,1,1),(14,'asdasdasd','lalala',10,2,1,2);
/*!40000 ALTER TABLE `producto` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-12-17 19:28:03

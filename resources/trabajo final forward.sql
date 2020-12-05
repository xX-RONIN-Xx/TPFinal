-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema trabajo_final_v1
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema trabajo_final_v1
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `trabajo_final_v1` DEFAULT CHARACTER SET utf8 ;
USE `trabajo_final_v1` ;

-- -----------------------------------------------------
-- Table `trabajo_final_v1`.`cliente`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `trabajo_final_v1`.`cliente` (
  `id_cliente` INT auto_increment NOT NULL,
  `usuario` VARCHAR(16) NOT NULL,
  `pass` VARCHAR(45) NOT NULL,
  `administrador` TINYINT NOT NULL,
  PRIMARY KEY (`id_cliente`));

insert into cliente 
values
(1,'lucas',1234,true),
(2,'mauricio',1234,true),
(3,'rocio',1234,true),
(4,'carlos',12345,false),
(5,'jose',1234,false),
(6,'pepito',123,false);




-- -----------------------------------------------------
-- Table `trabajo_final_v1`.`categoria`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `trabajo_final_v1`.`categoria` (
  `id_categoria` INT NOT NULL,
  `nombre` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id_categoria`))
ENGINE = InnoDB;

insert into categoria
values
(1,'peliculas'),
(2,'gamer'),
(3,'anime'),
(4,'curiosidades');
-- (5,''),
-- (6,''),




-- -----------------------------------------------------
-- Table `trabajo_final_v1`.`pedido_personalizado`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `trabajo_final_v1`.`pedido_personalizado` (
  `id_pedido` INT NOT NULL,
  `dimesion_x` INT NULL,
  `dimension_y` INT NULL,
  `dimension_z` INT NULL,
  `colores` VARCHAR(255) NULL,
  `tipo_filamento` VARCHAR(45) NULL,
  `altura_capa` INT NULL,
  `temperatura` INT NULL,
  `relleno` INT NULL,
  `comentarios` VARCHAR(255) NULL,
  `nombre_apellido` VARCHAR(255) NULL,
  PRIMARY KEY (`id_pedido`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `trabajo_final_v1`.`producto`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `trabajo_final_v1`.`producto` (
  `id_producto` INT NOT NULL,
  `nombre` VARCHAR(45) NULL,
  `descripcion` VARCHAR(255) NULL,
  `precio` INT NULL,
  `stock` INT NULL,
  `categoria_id_categoria` INT NOT NULL,
  `pedido_personalizado_id_pedido` INT NULL,
  PRIMARY KEY (`id_producto`),
  INDEX `fk_producto_categoria1_idx` (`categoria_id_categoria` ASC) VISIBLE,
  INDEX `fk_producto_pedido_personalizado1_idx` (`pedido_personalizado_id_pedido` ASC) VISIBLE,
  CONSTRAINT `fk_producto_categoria1`
    FOREIGN KEY (`categoria_id_categoria`)
    REFERENCES `trabajo_final_v1`.`categoria` (`id_categoria`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_producto_pedido_personalizado1`
    FOREIGN KEY (`pedido_personalizado_id_pedido`)
    REFERENCES `trabajo_final_v1`.`pedido_personalizado` (`id_pedido`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


insert into producto
values
(1,'Heisenberg','Figura decorativa de Breaking Bad',1800,10,1,null),
(2,'toy-story','Figura de woody',1800,10,1,null),
(3,'Apoya libros','Producto decorativo para sostener libros',1800,10,2,null),
(4,'Mario Bros','Macetas con motivos de Mario Bros',1800,10,2,null),
(5,'Ryuk','Figura de Shinigami Ryuk',1800,10,3,null),
(6,'Saga','Figura de Saga de Sagitario CDZ',1900,10,3,null),
(7,'Llavero-Foto','Laveros personalizados mediante foto',1,10,4,null);

-- La columna 'pedido_personalizado_id_pedido' define si el producto que se está creando es un pedido personalizado,
-- en caso de serlo, esta columna NO debe ser null (Lo hablamos en clase :p)

/*
p16,Fenix,Figura Ikki Fenix CDZ,1800,10,anime,/images/tp/fenix.jpg
p17,Diorama Vaf,Diorama de Volver al Futuro,1800,10,peliculas,/images/tp/diorama-vaf.jpg
p18,Galadriel,FIgura con base Galadriel Señor de los anillos,1800,10,peliculas,/images/tp/galadriel.jpg
p19,Eva 01,Figura de EVA01 Evangelion,1800,10,anime,/images/tp/eva01.jpg
_ID8yu9rip6p,prueba,test,1000,5,anime,corazon.jpg
_IDj5yi3wrr6,test2,test2,3,14,gamer,pikachu.jpeg
*/


-- -----------------------------------------------------
-- Table `trabajo_final_v1`.`carrito`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `trabajo_final_v1`.`carrito` (
  `id_carrito` INT NOT NULL,
  `cantidad` VARCHAR(45) NULL,
  `cliente_id_cliente` INT NOT NULL,
  `producto_id_producto` INT NOT NULL,
  `estado` VARCHAR(45) NOT NULL,
  INDEX `fk_carrito_cliente1_idx` (`cliente_id_cliente` ASC) VISIBLE,
  PRIMARY KEY (`id_carrito`),
  INDEX `fk_carrito_producto1_idx` (`producto_id_producto` ASC) VISIBLE,
  CONSTRAINT `fk_carrito_cliente1`
    FOREIGN KEY (`cliente_id_cliente`)
    REFERENCES `trabajo_final_v1`.`cliente` (`id_cliente`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_carrito_producto1`
    FOREIGN KEY (`producto_id_producto`)
    REFERENCES `trabajo_final_v1`.`producto` (`id_producto`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `trabajo_final_v1`.`factura`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `trabajo_final_v1`.`factura` (
  `id_factura` INT NOT NULL,
  `fecha` DATE NULL,
  `cliente_id_cliente` INT NOT NULL,
  PRIMARY KEY (`id_factura`),
  INDEX `fk_factura_cliente1_idx` (`cliente_id_cliente` ASC) VISIBLE,
  CONSTRAINT `fk_factura_cliente1`
    FOREIGN KEY (`cliente_id_cliente`)
    REFERENCES `trabajo_final_v1`.`cliente` (`id_cliente`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `trabajo_final_v1`.`detalle_factura`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `trabajo_final_v1`.`detalle_factura` (
  `id_detalle_factura` INT NOT NULL,
  `cantdad` INT NULL,
  `producto_id_producto` INT NOT NULL,
  `factura_id_factura` INT NOT NULL,
  PRIMARY KEY (`id_detalle_factura`),
  INDEX `fk_detalle_factura_producto1_idx` (`producto_id_producto` ASC) VISIBLE,
  INDEX `fk_detalle_factura_factura1_idx` (`factura_id_factura` ASC) VISIBLE,
  CONSTRAINT `fk_detalle_factura_producto1`
    FOREIGN KEY (`producto_id_producto`)
    REFERENCES `trabajo_final_v1`.`producto` (`id_producto`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_detalle_factura_factura1`
    FOREIGN KEY (`factura_id_factura`)
    REFERENCES `trabajo_final_v1`.`factura` (`id_factura`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `trabajo_final_v1`.`imagen_producto`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `trabajo_final_v1`.`imagen_producto` (
  `id_imagen` INT NOT NULL,
  `direccion` VARCHAR(255) NULL,
  `producto_id_producto` INT NOT NULL,
  PRIMARY KEY (`id_imagen`),
  INDEX `fk_imagen_producto_producto1_idx` (`producto_id_producto` ASC) VISIBLE,
  CONSTRAINT `fk_imagen_producto_producto1`
    FOREIGN KEY (`producto_id_producto`)
    REFERENCES `trabajo_final_v1`.`producto` (`id_producto`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

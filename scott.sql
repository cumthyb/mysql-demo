/*
 Navicat Premium Data Transfer

 Source Server         : aliyun_mysql
 Source Server Type    : MySQL
 Source Server Version : 50724
 Source Host           : cumthyb.site:3306
 Source Schema         : scott

 Target Server Type    : MySQL
 Target Server Version : 50724
 File Encoding         : 65001

 Date: 19/01/2019 00:27:36
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for BONUS
-- ----------------------------
DROP TABLE IF EXISTS `BONUS`;
CREATE TABLE `BONUS`  (
  `ENAME` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `JOB` varchar(9) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `SAL` decimal(10, 0) NULL DEFAULT NULL,
  `COMM` decimal(10, 0) NULL DEFAULT NULL
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for DEPT
-- ----------------------------
DROP TABLE IF EXISTS `DEPT`;
CREATE TABLE `DEPT`  (
  `DEPTNO` decimal(2, 0) NOT NULL,
  `DNAME` varchar(14) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `LOC` varchar(13) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`DEPTNO`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of DEPT
-- ----------------------------
INSERT INTO `DEPT` VALUES (10, 'ACCOUNTING', 'NEW YORK');
INSERT INTO `DEPT` VALUES (20, 'RESEARCH', 'DALLAS');
INSERT INTO `DEPT` VALUES (30, 'SALES', 'CHICAGO');
INSERT INTO `DEPT` VALUES (40, 'OPERATIONS', 'BOSTON');

-- ----------------------------
-- Table structure for EMP
-- ----------------------------
DROP TABLE IF EXISTS `EMP`;
CREATE TABLE `EMP`  (
  `EMPNO` decimal(4, 0) NOT NULL,
  `ENAME` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `JOB` varchar(9) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `MGR` decimal(4, 0) NULL DEFAULT NULL,
  `HIREDATE` date NULL DEFAULT NULL,
  `SAL` decimal(7, 0) NULL DEFAULT NULL,
  `COMM` decimal(7, 0) NULL DEFAULT NULL,
  `DEPTNO` decimal(2, 0) NOT NULL,
  PRIMARY KEY (`EMPNO`) USING BTREE,
  INDEX `depno`(`DEPTNO`) USING BTREE,
  CONSTRAINT `depno` FOREIGN KEY (`DEPTNO`) REFERENCES `DEPT` (`DEPTNO`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of EMP
-- ----------------------------
INSERT INTO `EMP` VALUES (7369, 'SMITH', 'CLERK', 7902, '1980-12-17', 800, NULL, 20);
INSERT INTO `EMP` VALUES (7499, 'ALLEN', 'SALESMAN', 7698, '1981-02-20', 1600, 300, 30);
INSERT INTO `EMP` VALUES (7521, 'WARD', 'SALESMAN', 7698, '1981-02-22', 1250, 500, 30);
INSERT INTO `EMP` VALUES (7566, 'JONES', 'MANAGER', 7839, '1981-04-02', 2975, NULL, 20);
INSERT INTO `EMP` VALUES (7654, 'MARTIN', 'SALESMAN', 7698, '1981-09-28', 1250, 1400, 30);
INSERT INTO `EMP` VALUES (7698, 'BLAKE', 'MANAGER', 7839, '1981-05-01', 2850, NULL, 30);
INSERT INTO `EMP` VALUES (7782, 'CLARK', 'MANAGER', 7839, '1981-06-09', 2450, NULL, 10);
INSERT INTO `EMP` VALUES (7788, 'SCOTT', 'ANALYST', 7566, '1987-07-13', 3000, NULL, 20);
INSERT INTO `EMP` VALUES (7839, 'KING', 'PRESIDENT', NULL, '1981-11-17', 5000, NULL, 10);
INSERT INTO `EMP` VALUES (7844, 'TURNER', 'SALESMAN', 7698, '1981-09-08', 1500, 0, 30);
INSERT INTO `EMP` VALUES (7876, 'ADAMS', 'CLERK', 7788, '1987-07-13', 1100, NULL, 20);
INSERT INTO `EMP` VALUES (7900, 'JAMES', 'CLERK', 7698, '1981-12-03', 950, NULL, 30);
INSERT INTO `EMP` VALUES (7902, 'FORD', 'ANALYST', 7566, '1981-12-03', 3000, NULL, 20);
INSERT INTO `EMP` VALUES (7934, 'MILLER', 'CLERK', 7782, '1982-01-23', 1300, NULL, 10);

-- ----------------------------
-- Table structure for SALGRADE
-- ----------------------------
DROP TABLE IF EXISTS `SALGRADE`;
CREATE TABLE `SALGRADE`  (
  `GRADE` decimal(10, 0) NULL DEFAULT NULL,
  `LOSAL` decimal(10, 0) NULL DEFAULT NULL,
  `HISAL` decimal(10, 0) NULL DEFAULT NULL
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of SALGRADE
-- ----------------------------
INSERT INTO `SALGRADE` VALUES (1, 700, 1200);
INSERT INTO `SALGRADE` VALUES (2, 1201, 1400);
INSERT INTO `SALGRADE` VALUES (3, 1401, 2000);
INSERT INTO `SALGRADE` VALUES (4, 2001, 3000);
INSERT INTO `SALGRADE` VALUES (5, 3001, 9999);

SET FOREIGN_KEY_CHECKS = 1;

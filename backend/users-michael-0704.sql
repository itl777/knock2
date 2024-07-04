-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- 主機： 127.0.0.1
-- 產生時間： 2024-07-04 10:49:05
-- 伺服器版本： 8.0.36
-- PHP 版本： 8.1.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 資料庫： `roomescape_database`
--

-- --------------------------------------------------------

--
-- 資料表結構 `users`
--

CREATE TABLE `users` (
  `user_id` int NOT NULL,
  `account` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `name` varchar(20) NOT NULL,
  `nick_name` varchar(50) NOT NULL,
  `gender` char(1) DEFAULT NULL,
  `birthday` date DEFAULT NULL,
  `mobile_phone` char(10) DEFAULT NULL,
  `invoice_carrier_id` char(8) DEFAULT NULL,
  `tax_id` char(8) DEFAULT NULL,
  `avatar` varchar(100) DEFAULT NULL,
  `note` varchar(200) DEFAULT NULL,
  `user_status` char(1) DEFAULT NULL,
  `blacklist` char(1) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `last_modified_at` datetime DEFAULT NULL,
  `last_modified_by` int DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- 傾印資料表的資料 `users`
--

INSERT INTO `users` (`user_id`, `account`, `password`, `name`, `nick_name`, `gender`, `birthday`, `mobile_phone`, `invoice_carrier_id`, `tax_id`, `avatar`, `note`, `user_status`, `blacklist`, `created_at`, `last_modified_at`, `last_modified_by`) VALUES
(1, 'test@test.com', '$2b$12$DqBWHczCf/.7my3PyAoOEeAGyLILWuz4wqJ54bEis61LwTA8poq7K', '管理員', '管管', '1', '2000-01-01', '0912345678', 'DE123456', '88775533', 'default.png', NULL, '1', '2', '2024-06-23 10:06:25', '2024-06-23 10:06:25', 1),
(2, 'kk@mail.com', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', '阿k', 'kk', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1),
(3, '123@mail.com', '$2b$12$DqBWHczCf/.7my3PyAoOEeAGyLILWuz4wqJ54bEis61LwTA8poq7K', '3', '王大明', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1),
(4, '444@mail.com', '$2b$12$DqBWHczCf/.7my3PyAoOEeAGyLILWuz4wqJ54bEis61LwTA8poq7K', '4', '張阿海', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1),
(5, '555444@mail.com', '$2b$12$DqBWHczCf/.7my3PyAoOEeAGyLILWuz4wqJ54bEis61LwTA8poq7K', '5', '小貓', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1),
(6, '666@mail.com', '$2b$12$DqBWHczCf/.7my3PyAoOEeAGyLILWuz4wqJ54bEis61LwTA8poq7K', '6', '兔爺', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1),
(7, '777@mail.com', '$2b$12$DqBWHczCf/.7my3PyAoOEeAGyLILWuz4wqJ54bEis61LwTA8poq7K', '7', '阿虎', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1),
(8, '888@mail.com', '$2b$12$DqBWHczCf/.7my3PyAoOEeAGyLILWuz4wqJ54bEis61LwTA8poq7K', '8', '王浩然', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1),
(9, '999@mail.com', '$2b$12$DqBWHczCf/.7my3PyAoOEeAGyLILWuz4wqJ54bEis61LwTA8poq7K', '9', '阿仙', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1),
(10, '100@mail.com', '$2b$12$DqBWHczCf/.7my3PyAoOEeAGyLILWuz4wqJ54bEis61LwTA8poq7K', '10', '趙無', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1),
(11, '111@mail.com', '$2b$12$DqBWHczCf/.7my3PyAoOEeAGyLILWuz4wqJ54bEis61LwTA8poq7K', '11', '張有', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1),
(12, '112@mail.com', '$2b$12$DqBWHczCf/.7my3PyAoOEeAGyLILWuz4wqJ54bEis61LwTA8poq7K', '12', 'Alex', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1),
(13, '113@mail.com', '$2b$12$DqBWHczCf/.7my3PyAoOEeAGyLILWuz4wqJ54bEis61LwTA8poq7K', '13', 'Sha', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1),
(14, '114@mail.com', '$2b$12$DqBWHczCf/.7my3PyAoOEeAGyLILWuz4wqJ54bEis61LwTA8poq7K', '14', 'QQQ', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1),
(15, '115@mail.com', '$2b$12$DqBWHczCf/.7my3PyAoOEeAGyLILWuz4wqJ54bEis61LwTA8poq7K', '15', '誰', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1),
(16, '116@mail.com', '$2b$12$DqBWHczCf/.7my3PyAoOEeAGyLILWuz4wqJ54bEis61LwTA8poq7K', '16', '喵喵', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1),
(17, '117@mail.com', '$2b$12$DqBWHczCf/.7my3PyAoOEeAGyLILWuz4wqJ54bEis61LwTA8poq7K', '17', '汪汪', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1),
(18, '118@mail.com', '$2b$12$DqBWHczCf/.7my3PyAoOEeAGyLILWuz4wqJ54bEis61LwTA8poq7K', '18', '咻咻', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1),
(19, '119@mail.com', '$2b$12$DqBWHczCf/.7my3PyAoOEeAGyLILWuz4wqJ54bEis61LwTA8poq7K', '19', '李坤', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1),
(20, '120@mail.com', '$2b$12$DqBWHczCf/.7my3PyAoOEeAGyLILWuz4wqJ54bEis61LwTA8poq7K', '20', '激勵投', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1),
(21, '121@mail.com', '$2b$12$DqBWHczCf/.7my3PyAoOEeAGyLILWuz4wqJ54bEis61LwTA8poq7K', '21', 'AAA', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1);

--
-- 已傾印資料表的索引
--

--
-- 資料表索引 `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `account` (`account`);

--
-- 在傾印的資料表使用自動遞增(AUTO_INCREMENT)
--

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

package com.example.fuchuang.service;

import com.example.fuchuang.DTO.ClassIdDTO;
import com.example.fuchuang.DTO.ClassTimeDTO;
import com.example.fuchuang.DTO.InterestDTO;
import com.example.fuchuang.Pojo.Class;
import com.baomidou.mybatisplus.extension.service.IService;
import com.example.fuchuang.Pojo.StudyTime;

import java.util.List;

/**
 * <p>
 * 课程表 服务类
 * </p>
 *
 * @author posty
 * @since 2024-03-08
 */
public interface IClassService extends IService<Class> {

    public  List<Class> adviceByScore(ClassIdDTO classIdDTO);

    public  List<Class> adviceByInterest(InterestDTO interestDTO);

    public  List<Class> adviceByTime(StudyTime studyTime);

}

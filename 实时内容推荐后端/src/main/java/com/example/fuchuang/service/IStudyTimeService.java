package com.example.fuchuang.service;

import com.example.fuchuang.Pojo.Result;
import com.example.fuchuang.Pojo.StudyTime;
import com.baomidou.mybatisplus.extension.service.IService;

/**
 * <p>
 * 学习时间 服务类
 * </p>
 *
 * @author posty
 * @since 2024-03-18
 */
public interface IStudyTimeService extends IService<StudyTime> {

    public Result addTime(StudyTime studyTime);

    public int selectTime(StudyTime studyTime);

    public Result updateTime(StudyTime studyTime);

}

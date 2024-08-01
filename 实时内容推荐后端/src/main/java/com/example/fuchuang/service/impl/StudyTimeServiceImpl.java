package com.example.fuchuang.service.impl;

import com.example.fuchuang.Pojo.Result;
import com.example.fuchuang.Pojo.StudyTime;
import com.example.fuchuang.mapper.StudyTimeMapper;
import com.example.fuchuang.service.IStudyTimeService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * <p>
 * 学习时间 服务实现类
 * </p>
 *
 * @author posty
 * @since 2024-03-18
 */
@Service
public class StudyTimeServiceImpl extends ServiceImpl<StudyTimeMapper, StudyTime> implements IStudyTimeService {

    @Autowired
    public StudyTimeMapper studyTimeMapper;

    @Override
    public Result addTime(StudyTime studyTime) {

        studyTimeMapper.addTime(studyTime);

        return Result.success("添加成功");
    }

    @Override
    public int selectTime(StudyTime studyTime) {

        return studyTimeMapper.selectTime(studyTime);
    }

    @Override
    public Result updateTime(StudyTime studyTime) {

        studyTimeMapper.updateTime(studyTime);

        return Result.success("修改成功");
    }

}

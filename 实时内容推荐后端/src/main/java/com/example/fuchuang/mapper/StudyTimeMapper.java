package com.example.fuchuang.mapper;

import com.example.fuchuang.DTO.ClassTimeDTO;
import com.example.fuchuang.Pojo.Result;
import com.example.fuchuang.Pojo.StudyTime;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

/**
 * <p>
 * 学习时间 Mapper 接口
 * </p>
 *
 * @author posty
 * @since 2024-03-18
 */
@Mapper
public interface StudyTimeMapper extends BaseMapper<StudyTime> {

    @Insert("insert into study_time (user_id, class_id, time) values (#{userId},#{classId},#{studyTime})")
    public void addTime(StudyTime studyTime);

    @Select("select time from study_time where user_id = #{userId} and class_id = #{classId}")
    public int selectTime(StudyTime studyTime);

    @Update("update study_time set time = #{studyTime} where user_id = #{userId} and class_id = #{classId}")
    public void updateTime(StudyTime studyTime);

}

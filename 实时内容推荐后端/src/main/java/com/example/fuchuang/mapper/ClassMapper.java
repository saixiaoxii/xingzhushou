package com.example.fuchuang.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.example.fuchuang.Pojo.Class;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

/**
 * <p>
 * 课程表 Mapper 接口
 * </p>
 *
 * @author posty
 * @since 2024-03-08
 */
@Mapper
public interface ClassMapper extends BaseMapper<Class> {

    @Select("select name,url,picture from class where id = #{id}")
    public Class selectNameAndUrlAndPicById(String id);

}

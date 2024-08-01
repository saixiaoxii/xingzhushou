package com.example.fuchuang.mapper;

import com.example.fuchuang.Pojo.Score;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;
import java.util.Map;
import java.util.Objects;

/**
 * <p>
 * 打分 Mapper 接口
 * </p>
 *
 * @author posty
 * @since 2024-03-13
 */
@Mapper
public interface ScoreMapper extends BaseMapper<Score> {

    @Insert("insert into score values (#{userId},#{classId},#{score})")
    public void addScore(Score score);

    @Select("select c.id ,COALESCE(s.score,-1) as score from class as c left join score as s on c.id = s.class_id and s.user_id = #{userId} where c.direction = (select direction from class where id = #{classId});")
    public List<Map<String, Objects>> selectSimilarClassScore(Score score);

}

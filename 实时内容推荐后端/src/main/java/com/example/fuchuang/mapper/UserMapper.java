package com.example.fuchuang.mapper;

import com.example.fuchuang.DTO.InterestDTO;
import com.example.fuchuang.DTO.UserDTO;
import com.example.fuchuang.Pojo.User;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

/**
 * <p>
 * 用户 Mapper 接口
 * </p>
 *
 * @author posty
 * @since 2024-03-08
 */
@Mapper
public interface UserMapper extends BaseMapper<User> {

    @Select("select * from user where id = #{id} and password = #{password}")
    public User login(UserDTO userDTO);

    @Insert("update user set interest = #{interest} where id = #{id}")
    public void addInterest(@Param("interest")String interest, @Param("id")String id);

    @Select("select interest from user where id = #{id}")
    public String selectInterest(String id);

}

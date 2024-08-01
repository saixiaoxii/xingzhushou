package com.example.fuchuang.service;

import com.example.fuchuang.DTO.InterestDTO;
import com.example.fuchuang.DTO.UserDTO;
import com.example.fuchuang.Pojo.User;
import com.baomidou.mybatisplus.extension.service.IService;

/**
 * <p>
 * 用户 服务类
 * </p>
 *
 * @author posty
 * @since 2024-03-08
 */
public interface IUserService extends IService<User> {

    public User login(UserDTO userDTO);

    public void addInterest(String interest,String id);

    public String selectInterest(UserDTO userDTO);

}

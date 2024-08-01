package com.example.fuchuang.DTO;

import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.Accessors;

import java.io.Serializable;

/**
 * <p>
 * 课程表
 * </p>
 *
 * @author posty
 * @since 2024-03-08
 */
@Data
@EqualsAndHashCode(callSuper = false)
@Accessors(chain = true)
public class ClassTimeDTO implements Serializable {

    private static final long serialVersionUID = 1L;

    @ApiModelProperty(value = "课程id")
    private String classId;

//    @ApiModelProperty(value = "课程名")
//    private String name;
//
//    @ApiModelProperty(value = "课程网址")
//    private String url;
//
    @ApiModelProperty(value = "课程总时长")
    private int totalTime;

    @ApiModelProperty(value = "用户学习时长")
    private int studyTime;
//
//    @ApiModelProperty(value = "课程领域")
//    private String area;
//
//    @ApiModelProperty(value = "学习方向")
//    private String direction;

}

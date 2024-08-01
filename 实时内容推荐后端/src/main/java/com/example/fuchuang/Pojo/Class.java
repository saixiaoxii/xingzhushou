package com.example.fuchuang.Pojo;

import com.baomidou.mybatisplus.annotation.TableName;

import java.io.Serializable;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.Accessors;

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
@TableName("class")
@ApiModel(value="Class对象", description="课程表")
public class Class implements Serializable {

    private static final long serialVersionUID = 1L;

    @ApiModelProperty(value = "课程id")
    private String id;

    @ApiModelProperty(value = "课程名")
    private String name;

    @ApiModelProperty(value = "课程网址")
    private String url;

    @ApiModelProperty(value = "图片地址")
    private String picture;

    @ApiModelProperty(value = "课程领域")
    private String area;

    @ApiModelProperty(value = "学习方向")
    private String direction;


}

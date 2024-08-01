package com.example.fuchuang.Pojo;

import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableName;
import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import java.io.Serializable;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.Accessors;

/**
 * <p>
 * 学习时间
 * </p>
 *
 * @author posty
 * @since 2024-03-18
 */
@Data
@EqualsAndHashCode(callSuper = false)
@Accessors(chain = true)
@TableName("study_time")
@ApiModel(value="StudyTime对象", description="学习时间")
public class StudyTime implements Serializable {

    private static final long serialVersionUID = 1L;

    @TableField(value = "user_id")
    @ApiModelProperty(value = "用户id")
    private String userId;

    @TableField(value = "class_id")
    @ApiModelProperty(value = "课程id")
    private String classId;

    @TableField(value = "time")
    @ApiModelProperty(value = "学习时间")
    private Integer studyTime;

    @TableField(exist = false)
    @ApiModelProperty(value = "总时长")
    private Integer totalTime;


}

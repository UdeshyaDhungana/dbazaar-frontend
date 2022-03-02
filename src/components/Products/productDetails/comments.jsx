import {
    FormControl,
    FormLabel, Heading, IconButton, Input, Menu, MenuButton, MenuItem, MenuList, Text, useToast
} from '@chakra-ui/react';
import { DotsThreeVertical, Trash } from 'phosphor-react';
import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../../App';
import { deleteCommentOfProduct, getProductComments, postCommentOnProduct } from '../../../services/productService';
import Button from '../../commons/atomic/button';
import unknownErrorToast from '../../commons/atomic/unknownErrorToast';


function Comments({ productId }) {
    const user = useContext(UserContext);
    const [comments, setComments] = useState([]);
    const [postComment, setPostComment] = useState("");
    const [reload, setReload] = useState(false);
    const toast = useToast();

    useEffect(() => {
        getProductComments(productId)
            .then(({ data }) => {
                setComments(data);
            })
            .catch(_ => {
                unknownErrorToast(toast)
            })
    }, [productId, toast, reload]);

    const handleSubmitComment = (e) => {
        e.preventDefault();
        postCommentOnProduct(productId, postComment)
            .then(({ data }) => {
                setPostComment("");
                setReload(!reload);
            })
            .catch(_ => {
                unknownErrorToast(toast);
            })
    }

    const deleteComment = (id) => {
        deleteCommentOfProduct(productId, id)
            .then(_ => {
                setReload(!reload);
            })
            .catch(_ => {
                unknownErrorToast(toast);
            })
    }

    return (
        <div>
            {comments.length > 0 && <Heading className='mb-2' size={"lg"}>Comments</Heading>}
            <form onSubmit={handleSubmitComment} >
                <FormControl>
                    <Heading>
                        <FormLabel display={"none"} htmlFor='comment'>Comment</FormLabel>
                    </Heading>
                    <Input
                        placeholder={"Add a comment"}
                        className='mb-2'
                        value={postComment}
                        onChange={({ target: { value } }) => setPostComment(value)}
                        id='comment' />
                    <Button disabled={!user || (postComment.length < 1 || postComment.length > 255)} type="submit" filled>Post</Button>
                </FormControl>
            </form>
            {comments.map(({ id, description, commentor }) => (
                <div className='my-4' key={id}>
                    <div className='mt-3'>
                        <Text fontWeight={"extrabold"}>{`${commentor.firstname} ${commentor.lastname}`}</Text>
                        <div className='grid grid-cols-12'>
                            <Text className='col-span-10'>{description}</Text>
                            {user && user.user_id === commentor.id && <Menu>
                                <MenuButton
                                    height={"6"}
                                    width={"1"}
                                    as={IconButton}
                                    aria-label='Options'
                                    icon={<DotsThreeVertical />}
                                    variant='outline'
                                />
                                <MenuList>
                                    <MenuItem onClick={() => deleteComment(id)} icon={<Trash />}>
                                        Delete
                                    </MenuItem>
                                </MenuList>
                            </Menu>}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Comments;
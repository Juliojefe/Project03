import React, { useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Modal,
  Image,
  Button,
  Alert,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';

interface Comment {
  id: number;
  author: string;
  content: string;
  timestamp: string;
  imageUri?: string;
}

interface Post {
  id: number;
  author: string;
  userType: 'customer' | 'mechanic';
  content: string;
  timestamp: string;
  comments: Comment[];
  editable?: boolean;
}

export default function PostsScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const mechanic = route.params?.mechanic;

  const [posts, setPosts] = useState<Post[]>(() => {
    const rawPosts = mechanic?.posts ?? [];
    return rawPosts.map((post: any, index: number) => ({
      id: index + 1,
      author: mechanic.name,
      userType: 'mechanic',
      content: post.content,
      timestamp: post.timestamp,
      comments: [],
      editable: true,
    }));
  });

  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editText, setEditText] = useState('');

  const [replyModalVisible, setReplyModalVisible] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [replyImageUri, setReplyImageUri] = useState<string | null>(null);
  const [replyingToPostId, setReplyingToPostId] = useState<number | null>(null);

  const handleEditPost = (post: Post) => {
    setEditingPost(post);
    setEditText(post.content);
    setEditModalVisible(true);
  };

  const saveEditPost = () => {
    if (!editingPost) return;
    setPosts((prev) =>
      prev.map((p) =>
        p.id === editingPost.id ? { ...p, content: editText } : p
      )
    );
    setEditModalVisible(false);
    setEditingPost(null);
  };

  const handlePickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setReplyImageUri(result.assets[0].uri);
    }
  };

  const openReplyModal = (postId: number) => {
    setReplyingToPostId(postId);
    setReplyText('');
    setReplyImageUri(null);
    setReplyModalVisible(true);
  };

  const submitReply = () => {
    if (replyingToPostId === null) return;

    const newComment: Comment = {
      id: Date.now(),
      author: 'You',
      content: replyText,
      timestamp: 'Just now',
      imageUri: replyImageUri ?? undefined,
    };

    setPosts((prevPosts) =>
      prevPosts.map((p) =>
        p.id === replyingToPostId
          ? { ...p, comments: [...p.comments, newComment] }
          : p
      )
    );

    setReplyModalVisible(false);
    setReplyText('');
    setReplyImageUri(null);
    setReplyingToPostId(null);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>🔧 Posts from {mechanic?.name ?? 'Selected Mechanic'}</Text>

      {/* Edit Account Button */}
      <TouchableOpacity
        onPress={() => navigation.navigate('EditAccount')}
        style={{ alignSelf: 'flex-end', marginBottom: 10 }}
      >
        <Text style={{ color: '#2563eb', fontWeight: 'bold' }}>✏️ Edit Account</Text>
      </TouchableOpacity>

      {posts.map((post) => (
        <View key={post.id} style={styles.postCard}>
          <View style={styles.postHeader}>
            <Text style={[styles.author, post.userType === 'mechanic' && styles.mechanic]}>
              {post.author}
            </Text>
            <Text style={styles.timestamp}>{post.timestamp}</Text>
          </View>

          <Text style={styles.postContent}>{post.content}</Text>

          {post.editable && (
            <TouchableOpacity onPress={() => handleEditPost(post)}>
              <Text style={styles.editText}> Edit</Text>
            </TouchableOpacity>
          )}

          {post.comments.length > 0 && (
            <View style={styles.commentSection}>
              {post.comments.map((comment) => (
                <View key={comment.id} style={styles.commentCard}>
                  <Text style={styles.commentAuthor}>{comment.author}</Text>
                  <Text>{comment.content}</Text>
                  {comment.imageUri && (
                    <Image source={{ uri: comment.imageUri }} style={styles.commentImage} />
                  )}
                  <Text style={styles.commentTimestamp}>{comment.timestamp}</Text>
                </View>
              ))}
            </View>
          )}

          <View style={styles.postActions}>
            <TouchableOpacity onPress={() => openReplyModal(post.id)}>
              <Text style={styles.action}>↩ Reply</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => Alert.alert('Like', 'You liked this post')}>
              <Text style={styles.action}> Like</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}

      {/* Edit Modal */}
      <Modal visible={editModalVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text>Edit Post:</Text>
            <TextInput
              style={styles.input}
              value={editText}
              onChangeText={setEditText}
              multiline
            />
            <Button title="Save" onPress={saveEditPost} />
          </View>
        </View>
      </Modal>

      {/* Reply Modal */}
      <Modal visible={replyModalVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text>Write a reply:</Text>
            <TextInput
              style={styles.input}
              value={replyText}
              onChangeText={setReplyText}
              multiline
              placeholder="Type your reply..."
            />
            {replyImageUri && (
              <Image source={{ uri: replyImageUri }} style={styles.commentImage} />
            )}
            <Button title="Pick Image" onPress={handlePickImage} />
            <Button title="Reply" onPress={submitReply} />
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

// ... (your styles object remains the same)


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f4f4f5',
    paddingHorizontal: 15,
    paddingTop: 40,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  postCard: {
    backgroundColor: '#fff',
    marginBottom: 15,
    padding: 15,
    borderRadius: 10,
    elevation: 2,
  },
  postHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  author: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
  },
  mechanic: {
    color: '#1e40af',
  },
  timestamp: {
    fontSize: 12,
    color: '#6b7280',
  },
  postContent: {
    fontSize: 14,
    marginVertical: 10,
    color: '#374151',
  },
  editText: {
    fontSize: 14,
    color: '#2563eb',
    marginBottom: 5,
  },
  postActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  action: {
    color: '#2563eb',
    fontWeight: '600',
  },
  commentSection: {
    marginTop: 10,
    paddingTop: 10,
    borderTopColor: '#ddd',
    borderTopWidth: 1,
  },
  commentCard: {
    backgroundColor: '#e0f2fe',
    borderRadius: 8,
    padding: 8,
    marginBottom: 5,
  },
  commentAuthor: {
    fontWeight: '600',
    fontSize: 12,
  },
  commentTimestamp: {
    fontSize: 10,
    color: '#6b7280',
    marginTop: 2,
  },
  commentImage: {
    width: 100,
    height: 100,
    marginTop: 5,
    borderRadius: 8,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
    height: 100,
    textAlignVertical: 'top',
  },
});

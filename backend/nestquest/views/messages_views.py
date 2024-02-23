from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from nestquest.models import Message, HousingRequest, HousingRequest
from nestquest.serializers import MessageSerializer
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger


@api_view(['GET'])
def getMyMessages(request):
    if not request.user.is_authenticated:
        return Response("Unauthorized", status=status.HTTP_401_UNAUTHORIZED)
    
    user = request.user
    
    messages = Message.objects.filter(user=user)
    
    page = request.query_params.get('page')
    paginator = Paginator(messages, 2)

    try:
        messages = paginator.page(page)
    except PageNotAnInteger:
        messages = paginator.page(1)
    except EmptyPage:
        messages = paginator.page(paginator.num_pages)

    if page is None:
        page = 1

    page = int(page)
    serializer = MessageSerializer(messages, many=True)
    return Response({'requests': serializer.data, 'page': page, 'pages': paginator.num_pages})
      

@api_view(['GET'])
def getMessage(request, pk):
    
    message = Message.objects.get(_id=pk)
    serializer = MessageSerializer(message, many=False)
    return Response(serializer.data)




@api_view(['DELETE'])
def deleteMessage(request, pk):
    
    message = Message.objects.get(_id=pk)
    message.delete()
    return Response('Deleted')

@api_view(['POST'])
def createMessage(request):
    try:
        data = request.data
        print("Received data:", data) 
        
        user = request.user
        request_id = int(data.get('request_id', 0))
        print("Request ID:", request_id)  
        
        housing_request = HousingRequest.objects.get(pk=request_id)
        
        message = Message.objects.create(
            request=housing_request,
            user=user,
            content=data['content'] 
        )

        serializer = MessageSerializer(message, many=False) 
        return Response(serializer.data)
    except HousingRequest.DoesNotExist:
        return Response("HousingRequest with the provided ID does not exist.", status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        print("Error:", e) 
        return Response(str(e), status=status.HTTP_400_BAD_REQUEST)



@api_view(['PUT'])
def updateMessage(request, pk):
    try:
        data = request.data
        message = Message.objects.get(_id=pk)

        message.content = data['content']

        message.save()

        serializer = MessageSerializer(message, many=False)  
        return Response(serializer.data)
    except Message.DoesNotExist:  
        return Response('Message not found', status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response(str(e), status=status.HTTP_400_BAD_REQUEST)
    

@api_view(['GET'])
def getOfferRequests(request):
        
        housing_offer = request.query_params.get('housing_offer')
        messages = Message.objects.filter(housing_offer=housing_offer)
        
        page = request.query_params.get('page')
        paginator = Paginator(messages, 2)

        try:
            messages = paginator.page(page)
        except PageNotAnInteger:
            messages = paginator.page(1)
        except EmptyPage:
            messages = paginator.page(paginator.num_pages)

        if page is None:
            page = 1

        page = int(page)
        
        serializer = MessageSerializer(messages, many=True)
        return Response({'messages': serializer.data, 'page': page, 'pages': paginator.num_pages})


